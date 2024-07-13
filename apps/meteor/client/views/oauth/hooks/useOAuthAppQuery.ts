import type { IOAuthAppsInfo } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

type UseOAuthAppQueryOptions = Omit<
	UseQueryOptions<IOAuthAppsInfo, unknown, IOAuthAppsInfo, readonly ['oauth-app', { readonly clientId: string | undefined }]>,
	'queryKey' | 'queryFn'
>;

export const useOAuthAppQuery = (clientId: string | undefined, options?: UseOAuthAppQueryOptions) => {
	const getOAuthApp = useEndpoint('GET', '/v1/oauth-apps.info');

	return useQuery(
		['oauth-app', { clientId }] as const,
		async () => {
			if (!clientId) {
				throw new Error('Invalid OAuth client');
			}

			const { oauthApp } = await getOAuthApp({ clientId });
			return oauthApp;
		},
		options,
	);
};

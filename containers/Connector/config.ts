import onboard from 'bnc-onboard';
import { Subscriptions } from 'bnc-onboard/dist/src/interfaces';
import { getInfuraRpcURL } from 'utils/infura';

import { Network } from 'store/wallet';

export const initOnboard = (network: Network, subscriptions: Subscriptions) => {
	const infuraRpc = getInfuraRpcURL(network);

	return onboard({
		dappId: process.env.NEXT_PUBLIC_BN_ONBOARD_API_KEY,
		hideBranding: true,
		networkId: network.id,
		subscriptions,
		darkMode: true,
		walletSelect: {
			wallets: [
				{
					name: 'Browser Wallet',
					iconSrc: '/images/wallet-icons/browserWallet.png',
					type: 'injected',
					link: 'https://metamask.io',
					wallet: async (helpers) => {
						const { createModernProviderInterface } = helpers;
						const provider = window.ethereum;
						return {
							provider,
							interface: provider ? createModernProviderInterface(provider) : null,
						};
					},
					preferred: true,
					desktop: true,
					mobile: true,
				},
				{
					walletName: 'ledger',
					rpcUrl: infuraRpc,
					preferred: true,
				},
				{
					walletName: 'lattice',
					appName: 'Kwenta',
					rpcUrl: infuraRpc,
				},
				{
					walletName: 'trezor',
					appUrl: 'https://www.synthetix.io',
					email: 'info@synthetix.io',
					rpcUrl: infuraRpc,
				},
				{
					walletName: 'walletConnect',
					rpc: { [network.id]: infuraRpc },
					preferred: true,
				},
				{ walletName: 'coinbase', preferred: true },
				{
					walletName: 'portis',
					apiKey: process.env.NEXT_PUBLIC_PORTIS_APP_ID,
					preferred: true,
				},
				{ walletName: 'trust', rpcUrl: infuraRpc },
				{ walletName: 'dapper' },
				{ walletName: 'walletLink', rpcUrl: infuraRpc },
				{ walletName: 'torus' },
				{ walletName: 'status' },
				// { walletName: 'unilogin' },
				{ walletName: 'authereum' },
				{ walletName: 'imToken' },
			],
		},
		walletCheck: [
			{ checkName: 'derivationPath' },
			{ checkName: 'accounts' },
			{ checkName: 'connect' },
		],
	});
};

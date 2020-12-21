import { ethers } from 'ethers';
import { NetworkId } from '@synthetixio/contracts-interface';

declare global {
	interface Window {
		web3?: {
			eth?: {
				net: {
					getId: () => NetworkId;
				};
			};
			version: {
				getNetwork(cb: (err: Error | undefined, networkId: NetworkId) => void): void;
				network: NetworkId;
			};
		};
		ethereum?: {
			on: (event: string, cb: () => void) => void;
			ethereum: ethers.providers.Provider | undefined;
			networkVersion: NetworkId;
			isMetaMask: boolean;
		};
	}
}

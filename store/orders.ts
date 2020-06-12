import { atom, selector } from 'recoil';
import { CurrencyKey } from 'constants/currency';
import { orderBy, groupBy } from 'lodash';
import { Transaction } from 'ethers';

const getKey = (subKey: string) => `orders/${subKey}`;

export type OrderType = 'market' | 'limit';
export type OrderStatus = 'pending' | 'confirmed' | 'cancelled';

export type Order = {
	hash: string;
	baseCurrencyKey: CurrencyKey;
	baseCurrencyAmount: string;
	quoteCurrencyKey: CurrencyKey;
	quoteCurrencyAmount: string;
	orderType: 'market' | 'limit';
	status: OrderStatus;
	timestamp: number;
	transaction: Transaction | null;
};

export type OrderByStatus = {
	pending: Order[];
	confirmed: Order[];
	cancelled: Order[];
};

// TOOD: fetch from local storage
export const ordersState = atom<Order[]>({
	key: getKey('orders'),
	default: [],
});

export const ordersByStatusState = selector<OrderByStatus>({
	key: getKey('ordersByStatus'),
	get: ({ get }) => {
		const orders = get(ordersState);

		const groupedOrders = groupBy(orderBy(orders, 'timestamp', 'desc'), 'status') as OrderByStatus;

		return {
			pending: groupedOrders.pending ?? [],
			confirmed: groupedOrders.confirmed ?? [],
			cancelled: groupedOrders.cancelled ?? [],
		};
	},
});

export const hasPendingOrderState = selector<boolean>({
	key: getKey('hasPendingOrder'),
	get: ({ get }) => {
		const ordersByStatus = get(ordersByStatusState);

		return ordersByStatus.pending.length > 0;
	},
});

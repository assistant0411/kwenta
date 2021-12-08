import React from 'react';
import styled from 'styled-components';

import { Synths } from 'constants/currency';
import CustomInput from 'components/Input/CustomInput';

type OrderSizingProps = {
	assetRate: number;
	amount: string;
	onAmountChange: (value: string) => void;
	marketAsset: string | null;
};

const OrderSizing: React.FC<OrderSizingProps> = ({
	marketAsset,
	amount,
	assetRate,
	onAmountChange,
}) => {
	const [usdAmount, setUsdAmount] = React.useState(Number(amount) * assetRate || '');

	const handleAmountChange = React.useCallback(
		(newAmount: string) => {
			onAmountChange(newAmount);
			if (newAmount === '') {
				setUsdAmount('');
			} else {
				setUsdAmount((Number(newAmount) * assetRate).toString());
			}
		},
		[assetRate, onAmountChange]
	);

	const handleUsdAmountChange = React.useCallback(
		(newUsdAmount: string) => {
			setUsdAmount(newUsdAmount);
			if (newUsdAmount === '') {
				onAmountChange('');
			} else {
				onAmountChange((Number(newUsdAmount) / assetRate).toString());
			}
		},
		[assetRate, onAmountChange]
	);

	return (
		<OrderSizingContainer>
			<OrderSizingTitle>
				Amount <span>— Set order size</span>
			</OrderSizingTitle>

			<CustomInput
				right={marketAsset || Synths.sUSD}
				value={amount}
				onChange={(e) => handleAmountChange(e.target.value)}
				style={{ marginBottom: '8px' }}
			/>

			<CustomInput
				right={Synths.sUSD}
				value={usdAmount}
				onChange={(e) => handleUsdAmountChange(e.target.value)}
			/>
		</OrderSizingContainer>
	);
};

const OrderSizingContainer = styled.div`
	margin-bottom: 16px;
`;

const OrderSizingTitle = styled.p`
	color: ${(props) => props.theme.colors.common.primaryWhite};
	font-size: 12px;
	margin-bottom: 8px;
	margin-left: 14px;

	span {
		color: ${(props) => props.theme.colors.common.secondaryGray};
	}
`;

export default OrderSizing;

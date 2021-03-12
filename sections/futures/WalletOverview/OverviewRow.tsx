import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { CurrencyKey } from 'constants/currency';
import { Data, DataRow, Subtitle } from '../common';
import { FlexDivRowCentered } from 'styles/common';
import CurrencyIcon from 'components/Currency/CurrencyIcon';
import { formatCurrency } from 'utils/formatters/number';

type OverviewRowProps = {
	subtitle: string;
	data: number;
	currencyKey: CurrencyKey;
	sign: string;
};

const OverviewRow: React.FC<OverviewRowProps> = ({ subtitle, data, currencyKey, sign }) => {
	const { t } = useTranslation();
	return (
		<StyledDataRow>
			<Subtitle>{subtitle}</Subtitle>
			<FlexDivRowCentered>
				<CurrencyIcon width={`15px`} currencyKey={currencyKey} />
				<StyledData>
					{formatCurrency(currencyKey, data, {
						sign: sign,
					})}
				</StyledData>
			</FlexDivRowCentered>
		</StyledDataRow>
	);
};

export default OverviewRow;

const StyledDataRow = styled(DataRow)`
	margin: 8px 0px;
	border-bottom: 1px solid ${(props) => props.theme.colors.navy};
`;

const StyledData = styled(Data)`
	margin-left: 4px;
`;

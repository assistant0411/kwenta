import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import styled from 'styled-components';
import useSynthetixQueries from '@synthetixio/queries';
import { wei } from '@synthetixio/wei';

import useSelectedPriceCurrency from 'hooks/useSelectedPriceCurrency';
import useGetFuturesMarkets from 'queries/futures/useGetFuturesMarkets';
import useGetFuturesTradingVolume from 'queries/futures/useGetFuturesTradingVolume';

import { getExchangeRatesForCurrencies } from 'utils/currencies';
import { formatCurrency, formatPercent, zeroBN } from 'utils/formatters/number';

import PriceChartCard from 'sections/exchange/TradeCard/Charts/PriceChartCard';

import CurrencyIcon from 'components/Currency/CurrencyIcon';
import UserInfo from '../UserInfo';
import { FuturesMarket } from 'queries/futures/types';
import { ChartType } from 'constants/chartType';
import { Period } from 'constants/period';
import { singleChartTypeState, singleChartPeriodState } from 'store/app';
import usePersistedRecoilState from 'hooks/usePersistedRecoilState';
import { CurrencyKey } from 'constants/currency';
import MarketDetails from '../MarketDetails';

type MarketInfoProps = {
	market: string;
};

const MarketInfo: FC<MarketInfoProps> = ({ market }) => {
	const { t } = useTranslation();
	const { useExchangeRatesQuery } = useSynthetixQueries();
	const exchangeRatesQuery = useExchangeRatesQuery();
	const futuresMarketsQuery = useGetFuturesMarkets();
	const futuresTradingVolumeQuery = useGetFuturesTradingVolume(market);

	const exchangeRates = exchangeRatesQuery.isSuccess ? exchangeRatesQuery.data ?? null : null;
	const { selectedPriceCurrency } = useSelectedPriceCurrency();
	const futuresTradingVolume = futuresTradingVolumeQuery?.data ?? null;
	const marketSummary: FuturesMarket | null =
		futuresMarketsQuery?.data?.find(({ asset }) => asset === market) ?? null;

	const baseCurrencyKey = market as CurrencyKey;

	const [chartType, setChartType] = usePersistedRecoilState<ChartType>(singleChartTypeState);
	const [chartPeriod, setChartPeriod] = usePersistedRecoilState<Period>(singleChartPeriodState);

	const basePriceRate = useMemo(
		() => getExchangeRatesForCurrencies(exchangeRates, baseCurrencyKey, selectedPriceCurrency.name),
		[exchangeRates, baseCurrencyKey, selectedPriceCurrency]
	);

	const marketInfoCols = useMemo(
		() => [
			{
				title: t('futures.market.info.asset'),
				data: (
					<>
						<StyledCurrencyIcon currencyKey={baseCurrencyKey} />
						{baseCurrencyKey}
					</>
				),
			},
			{
				title: t('futures.market.info.size'),
				data: formatCurrency(
					selectedPriceCurrency.name,
					marketSummary?.marketSize?.mul(wei(basePriceRate ?? 0)) ?? zeroBN,
					{
						sign: '$',
					}
				),
			},
			{
				title: t('futures.market.info.volume'),
				data: formatCurrency(
					selectedPriceCurrency.name,
					futuresTradingVolume?.mul(wei(basePriceRate ?? 0)) ?? zeroBN,
					{
						sign: '$',
					}
				),
			},
			{
				title: t('futures.market.info.skew'),
				data: formatCurrency(
					selectedPriceCurrency.name,
					marketSummary?.marketSkew?.mul(wei(basePriceRate ?? 0)) ?? zeroBN,
					{
						sign: '$',
					}
				),
			},
			{
				title: t('futures.market.info.rate'),
				data: formatPercent(marketSummary?.currentFundingRate ?? zeroBN),
			},
		],
		[
			marketSummary,
			baseCurrencyKey,
			t,
			selectedPriceCurrency.name,
			basePriceRate,
			futuresTradingVolume,
		]
	);

	return (
		<>
			<Head>
				<title>
					{basePriceRate
						? t('futures.market.page-title-rate', {
								baseCurrencyKey,
								rate: formatCurrency(selectedPriceCurrency.name, basePriceRate, {
									currencyKey: selectedPriceCurrency.name,
								}),
						  })
						: t('futures.market.page-title')}
				</title>
			</Head>
			<MarketDetails baseCurrencyKey={baseCurrencyKey} />
			<PriceChartCard
				side="base"
				currencyKey={baseCurrencyKey}
				priceRate={basePriceRate}
				selectedChartType={chartType}
				setSelectedChartType={setChartType}
				selectedChartPeriod={chartPeriod}
				setSelectedChartPeriod={setChartPeriod}
			/>
			<UserInfo marketAsset={baseCurrencyKey} />
		</>
	);
};
export default MarketInfo;

const StyledCurrencyIcon = styled(CurrencyIcon)`
	margin-right: 4px;
`;

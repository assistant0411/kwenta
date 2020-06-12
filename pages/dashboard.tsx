import { useState } from 'react';
import styled from 'styled-components';
import synthetix from 'lib/synthetix';
import { useRecoilValue } from 'recoil';

import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { priceCurrencyState } from 'store/app';

import { FlexDiv, FlexDivCol, SelectableCurrencyRow, FlexDivRow } from 'styles/common';
import { TabList, TabPanel, TabButton } from 'components/Tab';
import useSynthsBalancesQuery, {
	SynthBalance,
} from 'queries/walletBalances/useSynthsBalancesQuery';
import Currency from 'components/Currency';
import useExchangeRatesQuery from 'queries/rates/useExchangeRatesQuery';
import { fonts } from 'styles/theme/fonts';
import Button from 'components/Button';
import { NO_VALUE } from 'constants/placeholder';

const TABS = {
	SYNTH_BALANCES: 'synth-balances',
	CONVERT: 'convert',
	CRYPTO_BALANCES: 'crypto-balances',
	TRANSACTIONS: 'transactions',
};

const SynthBalances = () => {
	const exchangeRatesQuery = useExchangeRatesQuery({ refetchInterval: false });
	const synthsBalancesQuery = useSynthsBalancesQuery({ enabled: exchangeRatesQuery.isSuccess });
	const selectedPriceCurrency = useRecoilValue(priceCurrencyState);

	return (
		<>
			{synthsBalancesQuery.isSuccess &&
				synthsBalancesQuery.data.balances.map((synth: SynthBalance) => {
					const synthDesc =
						synthetix.synthsMap != null ? synthetix.synthsMap[synth.currencyKey]?.desc : '';
					return (
						<SynthBalancesRow key={synth.currencyKey}>
							<div>
								<Currency.Name currencyKey={synth.currencyKey} name={synthDesc} showIcon={true} />
							</div>
							<div>
								<Currency.Amount
									currencyKey={synth.currencyKey}
									amount={synth.balance}
									totalValue={synth.usdBalance}
									sign={selectedPriceCurrency.sign}
								/>
							</div>
							<div>
								{exchangeRatesQuery.data !== undefined && (
									<Currency.Price
										currencyKey={synth.currencyKey}
										price={exchangeRatesQuery.data[synth.currencyKey]}
										sign={selectedPriceCurrency.sign}
									/>
								)}
							</div>
							<div>Percent</div>
						</SynthBalancesRow>
					);
				})}
		</>
	);
};

const SynthBalancesRow = styled(FlexDivRow)`
	max-width: 686px;
`;

const DashboardPage = () => {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState(TABS.SYNTH_BALANCES);
	const exchangeRatesQuery = useExchangeRatesQuery({ refetchInterval: false });
	const synthsBalancesQuery = useSynthsBalancesQuery({ enabled: exchangeRatesQuery.isSuccess });
	const noSynths = !synthsBalancesQuery.data || synthsBalancesQuery.data.balances.length === 0;
	const synths = synthetix.js?.synths ?? [];
	const selectedPriceCurrency = useRecoilValue(priceCurrencyState);
	return (
		<>
			<Head>
				<title>{t('dashboard.page-title')}</title>
			</Head>
			<Container>
				<LeftContainer>
					{noSynths ? (
						<NoSynthsCard />
					) : (
						<FlexDivCol>
							<TabList>
								<TabButton
									name={TABS.SYNTH_BALANCES}
									active={activeTab === TABS.SYNTH_BALANCES}
									onClick={() => setActiveTab(TABS.SYNTH_BALANCES)}
								>
									{t('dashboard.tabs.nav.synth-balances')}
								</TabButton>
								<TabButton
									name={TABS.CONVERT}
									active={activeTab === TABS.CONVERT}
									onClick={() => setActiveTab(TABS.CONVERT)}
								>
									{t('dashboard.tabs.nav.convert')}
								</TabButton>
								<TabButton
									name={TABS.CRYPTO_BALANCES}
									active={activeTab === TABS.CRYPTO_BALANCES}
									onClick={() => setActiveTab(TABS.CRYPTO_BALANCES)}
								>
									{t('dashboard.tabs.nav.crypto-balances')}
								</TabButton>
								<TabButton
									name={TABS.TRANSACTIONS}
									active={activeTab === TABS.TRANSACTIONS}
									onClick={() => setActiveTab(TABS.TRANSACTIONS)}
								>
									{t('dashboard.tabs.nav.transactions')}
								</TabButton>
							</TabList>
							<TabPanel name={TABS.SYNTH_BALANCES} activeTab={activeTab}>
								<SynthBalances />
							</TabPanel>
						</FlexDivCol>
					)}
				</LeftContainer>
				<RightContainer>
					<CardTitle>{t('dashboard.trending')}</CardTitle>
					{synths.map((synth) => {
						const selectPriceCurrencyRate =
							exchangeRatesQuery.data && exchangeRatesQuery.data[selectedPriceCurrency.name];
						let price = exchangeRatesQuery.data && exchangeRatesQuery.data[synth.name];
						const currencyKey = synth.name;

						if (price != null && selectPriceCurrencyRate != null) {
							price /= selectPriceCurrencyRate;
						}
						return (
							<SelectableCurrencyRow key={currencyKey} isSelectable={true}>
								<Currency.Name currencyKey={currencyKey} name={synth.desc} showIcon={true} />
								{price != null ? (
									<Currency.Price
										currencyKey={currencyKey}
										price={price}
										sign={selectedPriceCurrency.sign}
									/>
								) : (
									NO_VALUE
								)}
							</SelectableCurrencyRow>
						);
					})}
				</RightContainer>
			</Container>
		</>
	);
};

const CardTitle = styled.div`
	${fonts.body['bold-medium']}
	color: ${(props) => props.theme.colors.white};
`;

const Container = styled(FlexDiv)`
	justify-content: space-between;
	align-items: start;
	width: 100%;
	flex-grow: 1;
`;

const LeftContainer = styled(FlexDivCol)`
	flex-grow: 1;
	max-width: 1000px;
	padding: 48px 0px;
	margin: 0px 75px;
`;

const RightContainer = styled(FlexDivCol)`
	width: 356px;
	background-color: ${(props) => props.theme.colors.elderberry};
	padding: 48px 32px;
`;

const NoSynthTitle = styled.div`
	${fonts.data['title-small']}
	color: ${(props) => props.theme.colors.blueberry};
	text-transform: uppercase;
	text-align: center;
	margin-bottom: 4px;
`;

const NoSynthSubtitle = styled.div`
	${fonts.heading.h4}
	color: ${(props) => props.theme.colors.white};
	text-align:center;
	margin-bottom: 33px;
`;

const Center = styled.div`
	margin: 0 auto;
	margin-bottom: 78px;
`;

const NoSynthsCard = () => {
	const { t } = useTranslation();
	return (
		<FlexDivCol>
			<NoSynthTitle>Learn How it Works</NoSynthTitle>
			<NoSynthSubtitle>Get up and running on Kwenta and exchange everything.</NoSynthSubtitle>
			<Center>
				<Button variant="primary" isRounded={true} size="lg">
					Learn More
				</Button>
			</Center>
			<CardTitle>{t('dashboard.no-synths-card.convert')}</CardTitle>
		</FlexDivCol>
	);
};

export default DashboardPage;

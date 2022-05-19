import { wei } from '@synthetixio/wei';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CellProps } from 'react-table';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Currency from 'components/Currency';
import { DesktopOnlyView, MobileOrTabletView } from 'components/Media';
import Table, { TableNoResults } from 'components/Table';
import { Synths } from 'constants/currency';
import useGetFile from 'queries/files/useGetFile';
import { walletAddressState } from 'store/wallet';
import { formatPercent } from 'utils/formatters/number';
import { truncateAddress } from 'utils/formatters/string';

import { AccountStat, getMedal, PIN, StyledTrader, Tier } from '../common';
import { COMPETITION_DATA_LOCATION, MOBILE_COMPETITION_START } from './constants';

type CompetitionProps = {
	activeTier: Tier;
	ensInfo: Record<string, string>;
	compact?: boolean;
	onClickTrader: (trader: string) => void;
	searchTerm?: string | undefined;
};

const Competition: FC<CompetitionProps> = ({
	activeTier,
	ensInfo,
	compact,
	onClickTrader,
	searchTerm,
}: CompetitionProps) => {
	const { t } = useTranslation();
	const walletAddress = useRecoilValue(walletAddressState);
	const competitionQuery = useGetFile(COMPETITION_DATA_LOCATION);

	const walletTier = useMemo(() => {
		const competitionData = competitionQuery?.data ?? [];
		const walletStat = competitionData.find(
			({ account }: AccountStat) => account === walletAddress
		);
		return walletStat ? walletStat.tier : null;
	}, [walletAddress, competitionQuery]);

	let data = useMemo(() => {
		const competitionData = competitionQuery?.data ?? [];

		const cleanCompetitionData: AccountStat[] = competitionData
			.sort((a: AccountStat, b: AccountStat) => a.rank - b.rank)
			.map((trader: any, i: number) => {
				return {
					...trader,
					trader: trader.account,
					traderEns: ensInfo[trader.account],
					rankText: trader.rank.toString(),
					traderShort: truncateAddress(trader.account),
					pnl: wei(trader.pnl),
					pnlPct: `(${formatPercent(trader?.pnl_pct)})`,
					totalVolume: trader.volume,
					totalTrades: trader.trades,
				};
			})
			.filter((trader: { tier: string }) => {
				return compact && !!walletTier ? trader.tier === walletTier : trader.tier === activeTier;
			})
			.filter((i: { trader: string; traderEns: string }) =>
				searchTerm?.length
					? i.trader.toLowerCase().includes(searchTerm) ||
					  i.traderEns?.toLowerCase().includes(searchTerm)
					: true
			);

		const pinRow = cleanCompetitionData
			.filter((trader) => trader.account.toLowerCase() === walletAddress?.toLowerCase())
			.map((trader) => ({
				...trader,
				rankText: `${trader.rank}${PIN}`,
			}));

		return [...pinRow, ...cleanCompetitionData];
	}, [competitionQuery, ensInfo, searchTerm, activeTier, walletAddress, walletTier, compact]);

	const noResultsMessage =
		Date.now() > MOBILE_COMPETITION_START.getTime()
			? t('leaderboard.competition.table.started')
			: t('leaderboard.competition.table.starting-soon');

	return (
		<>
			<DesktopOnlyView>
				<StyledTable
					compact={compact}
					showPagination={!compact}
					showShortList={compact}
					pageSize={10}
					isLoading={competitionQuery.isLoading}
					data={data}
					hiddenColumns={!compact ? undefined : ['totalTrades', 'liquidations', 'totalVolume']}
					noResultsMessage={<TableNoResults>{noResultsMessage}</TableNoResults>}
					columns={[
						{
							Header: (
								<TableTitle>
									<TitleText>{t('leaderboard.competition.title')}</TitleText>
								</TableTitle>
							),
							accessor: 'title',
							columns: [
								{
									Header: <TableHeader>{t('leaderboard.leaderboard.table.rank')}</TableHeader>,
									accessor: 'rank',
									sortType: 'basic',
									Cell: (cellProps: CellProps<any>) => (
										<StyledOrderType>{cellProps.row.original.rankText}</StyledOrderType>
									),
									width: compact ? 100 : 60,
								},
								{
									Header: <TableHeader>{t('leaderboard.leaderboard.table.trader')}</TableHeader>,
									accessor: 'trader',
									Cell: (cellProps: CellProps<any>) => {
										return (
											<StyledOrderType
												onClick={() => onClickTrader(cellProps.row.original.account)}
											>
												<StyledTrader>
													{cellProps.row.original.traderEns ?? cellProps.row.original.traderShort}
												</StyledTrader>
												{getMedal(cellProps.row.original.rank)}
											</StyledOrderType>
										);
									},
									width: compact ? 180 : 120,
								},
								{
									Header: (
										<TableHeader>{t('leaderboard.leaderboard.table.total-trades')}</TableHeader>
									),
									accessor: 'totalTrades',
									sortType: 'basic',
									width: compact ? 'auto' : 80,
									sortable: true,
								},
								{
									Header: (
										<TableHeader>{t('leaderboard.leaderboard.table.liquidations')}</TableHeader>
									),
									accessor: 'liquidations',
									sortType: 'basic',
									width: compact ? 'auto' : 80,
									sortable: true,
								},
								{
									Header: (
										<TableHeader>{t('leaderboard.leaderboard.table.total-volume')}</TableHeader>
									),
									accessor: 'totalVolume',
									sortType: 'basic',
									Cell: (cellProps: CellProps<any>) => (
										<Currency.Price
											currencyKey={Synths.sUSD}
											price={cellProps.row.original.totalVolume}
											sign={'$'}
											conversionRate={1}
										/>
									),
									width: compact ? 'auto' : 100,
									sortable: true,
								},
								{
									Header: <TableHeader>{t('leaderboard.leaderboard.table.pnl')}</TableHeader>,
									accessor: 'pnl',
									sortType: 'basic',
									Cell: (cellProps: CellProps<any>) => (
										<PnlContainer direction={'column'}>
											<ColorCodedPrice
												currencyKey={Synths.sUSD}
												price={cellProps.row.original.pnl}
												sign={'$'}
												conversionRate={1}
											/>
											<StyledValue>{cellProps.row.original.pnlPct}</StyledValue>
										</PnlContainer>
									),
									width: compact ? 120 : 100,
									sortable: true,
								},
							],
						},
					]}
				/>
			</DesktopOnlyView>
			<MobileOrTabletView>
				<StyledTable
					data={data}
					compact={compact}
					hideHeaders={compact}
					isLoading={false}
					showPagination
					pageSize={10}
					columns={[
						{
							Header: () => <TableHeader>{t('leaderboard.leaderboard.table.rank')}</TableHeader>,
							accessor: 'rank',
							Cell: (cellProps: CellProps<any>) => (
								<StyledOrderType>{cellProps.row.original.rankText}</StyledOrderType>
							),
							width: 60,
						},
						{
							Header: () => <TableHeader>{t('leaderboard.leaderboard.table.trader')}</TableHeader>,
							accessor: 'trader',
							Cell: (cellProps: CellProps<any>) => (
								<StyledOrderType onClick={() => onClickTrader(cellProps.row.original.account)}>
									<StyledValue>
										{cellProps.row.original.traderEns ?? cellProps.row.original.traderShort}
									</StyledValue>
									{getMedal(cellProps.row.original.rank)}
								</StyledOrderType>
							),
							width: 150,
						},
						{
							Header: () => <TableHeader>{t('leaderboard.leaderboard.table.pnl')}</TableHeader>,
							accessor: 'pnl',
							Cell: (cellProps: CellProps<any>) => (
								<PnlContainer direction={'column'}>
									<ColorCodedPrice
										currencyKey={Synths.sUSD}
										price={cellProps.row.original.pnl}
										sign={'$'}
										conversionRate={1}
									/>
									<StyledValue>{cellProps.row.original.pnlPct}</StyledValue>
								</PnlContainer>
							),
							width: 125,
						},
					]}
				/>
			</MobileOrTabletView>
		</>
	);
};

const StyledTable = styled(Table)<{ compact: boolean | undefined }>`
	margin-top: ${({ compact }) => (compact ? '0' : '15px')};
`;

const TableTitle = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const TitleText = styled.a`
	font-family: ${(props) => props.theme.fonts.regular};
	color: ${(props) => props.theme.colors.selectedTheme.gray};
`;

const TableHeader = styled.div`
	font-family: ${(props) => props.theme.fonts.regular};
	color: ${(props) => props.theme.colors.selectedTheme.gray};
`;

const PnlContainer = styled.div<{ direction: 'row' | 'column' }>`
	display: flex;
	flex-direction: ${(props) => props.direction};
	align-items: center;
`;

const ColorCodedPrice = styled(Currency.Price)`
	align-items: right;
	margin-right: 5px;
	color: ${(props) =>
		props.price > 0
			? props.theme.colors.selectedTheme.green
			: props.price < 0
			? props.theme.colors.selectedTheme.red
			: props.theme.colors.selectedTheme.button.text};
`;

const StyledValue = styled.div`
	font-family: ${(props) => props.theme.fonts.mono};
	color: ${(props) =>
		props.color === 'green'
			? props.theme.colors.selectedTheme.green
			: props.color === 'red'
			? props.theme.colors.selectedTheme.red
			: props.theme.colors.selectedTheme.button.text};
	margin: 0;
	text-align: end;
`;

const StyledOrderType = styled.div`
	color: ${(props) => props.theme.colors.selectedTheme.button.text};
	display: flex;
	align-items: center;
`;

export default Competition;

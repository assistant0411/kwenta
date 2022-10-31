import { useMemo } from 'react';
import styled from 'styled-components';

import { selectMarketInfo } from 'state/futures/selectors';
import { useAppSelector } from 'state/hooks';
import { formatDollars, formatPercent } from 'utils/formatters/number';

const MobileMarketDetail: React.FC = () => {
	const marketInfo = useAppSelector(selectMarketInfo);

	const pausedClass = marketInfo?.isSuspended ? 'paused' : '';

	const longSkewText = useMemo(() => {
		return (
			!!marketInfo &&
			formatDollars(marketInfo.openInterest.longUSD, {
				maxDecimals: 2,
				...(marketInfo?.openInterest.longUSD.gt(1e6)
					? { truncation: { divisor: 1e6, unit: 'M' } }
					: {}),
			})
		);
	}, [marketInfo]);

	const shortSkewText = useMemo(() => {
		return (
			!!marketInfo &&
			formatDollars(marketInfo.openInterest.shortUSD, {
				maxDecimals: 2,
				...(marketInfo?.openInterest.shortUSD.gt(1e6)
					? { truncation: { divisor: 1e6, unit: 'M' } }
					: {}),
			})
		);
	}, [marketInfo]);

	return (
		<div key="Skew">
			<p className="heading">Skew</p>
			<SkewDataContainer>
				<div className={`value green ${pausedClass}`}>
					{!!marketInfo && formatPercent(marketInfo.openInterest.longPct ?? 0, { minDecimals: 0 })}{' '}
					({longSkewText})
				</div>
				<div className={`value red ${pausedClass}`}>
					{!!marketInfo && formatPercent(marketInfo.openInterest.shortPct ?? 0, { minDecimals: 0 })}{' '}
					({shortSkewText})
				</div>
			</SkewDataContainer>
		</div>
	);
};

export default MobileMarketDetail;

const SkewDataContainer = styled.div`
	grid-row: 1;
`;

import styled from 'styled-components';
import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useTranslation } from 'react-i18next';

import { linkCSS } from 'styles/common';

import { MENU_LINKS } from '../constants';

const Nav: FC = () => {
	const { t } = useTranslation();
	const { asPath } = useRouter();

	return (
		<nav>
			<MenuLinks>
				{MENU_LINKS.map(({ i18nLabel, link }) => (
					<MenuLinkItem key={link} isActive={asPath === link}>
						<Link href={link}>
							<a>{t(i18nLabel)}</a>
						</Link>
					</MenuLinkItem>
				))}
			</MenuLinks>
		</nav>
	);
};

const MenuLinks = styled.ul`
	display: flex;
`;

const MenuLinkItem = styled.li<{ isActive: boolean }>`
	padding-right: 20px;
	a {
		${linkCSS};
		text-transform: capitalize;
		color: ${(props) => (props.isActive ? props.theme.colors.white : props.theme.colors.silver)};
		&:hover {
			color: ${(props) => props.theme.colors.white};
		}
	}
`;

export default Nav;

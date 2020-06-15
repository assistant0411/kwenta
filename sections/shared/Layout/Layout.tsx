import { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Header from './Header';
import Footer from './Footer';

import { linkCSS, FlexDiv } from 'styles/common';

type LayoutProps = {
	children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<GlobalStyle />
			<FullScreenContainer>
				<PageContainer>
					<Header />
					<Content>{children}</Content>
					<Footer />
				</PageContainer>
			</FullScreenContainer>
		</>
	);
};

const FullScreenContainer = styled(FlexDiv)`
	flex-flow: column;
	width: 100%;
	height: 100vh;
	position: relative;
`;

const PageContainer = styled.div`
	padding: 0 14px;
`;

const Content = styled.section`
	position: relative;
	margin: 0 auto;
`;

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
	}

	#__next {
		width: 100%;
		height: 100%;
		position: relative;
	}

	body {
		font-family: 'AkkuratLLWeb-Regular', -apple-system, BlinkMacSystemFont, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		margin: 0;
		text-rendering: optimizeSpeed;
		position: relative;
		min-height: 100vh;
		scroll-behavior: smooth;
		background-color: ${(props) => props.theme.colors.black};
		color: ${(props) => props.theme.colors.blueberry};
		font-size: 12px;
		line-height: 140%;
	}

	a {
		${linkCSS};
		color: ${(props) => props.theme.colors.white};
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}	

	@font-face {
		font-family: 'AkkuratLLWeb-Regular';
		src: url('/fonts/AkkuratLLWeb-Regular.woff2') format('woff2'), 
			 url('/fonts/AkkuratLLWeb-Regular.woff') format('woff');
	}

	@font-face {
		font-family: 'AkkuratLLWeb-Bold';
		src: url('/fonts/AkkuratLLWeb-Bold.woff2') format('woff2'), 
		     url('/fonts/AkkuratLLWeb-Bold.woff') format('woff');
	}

	@font-face {
		font-family: 'AkkuratMonoLLWeb-Regular';
		src: url('/fonts/AkkuratMonoLLWeb-Regular.woff2') format('woff2'), 
		     url('/fonts/AkkuratMonoLLWeb-Regular.woff') format('woff');
	}
	/* blocknative onboard style overrides */
	.bn-onboard-custom {
		&&& {
			font-family: 'AkkuratLLWeb-Regular', -apple-system, BlinkMacSystemFont, sans-serif;
			color: ${(props) => props.theme.colors.white};
			
		}
		&&.bn-onboard-modal {
			background: rgba(0, 0, 0, 0.8);
		}
		&&.bn-onboard-modal-content-header-icon {
			background: none;
		}
		&&.bn-onboard-selected-wallet {
			background-color: ${(props) => props.theme.colors.navy};
			color: ${(props) => props.theme.colors.white};
		}
		&&.bn-onboard-modal-content {
			background-color: ${(props) => props.theme.colors.elderberry};
		}
		&&.bn-onboard-select-wallet-info {
			cursor: pointer;
			color: ${(props) => props.theme.colors.purpleHover};
		}
		&&.bn-onboard-dark-mode-background-hover {
			&:hover {
				background-color: ${(props) => props.theme.colors.navy};
			}
		}
		&&.bn-onboard-prepare-button {
			border-radius: 2px;
			color: ${(props) => props.theme.colors.white} ;
			background-color: ${(props) => props.theme.colors.elderberry} ;
			border: 1px solid ${(props) => props.theme.colors.navy} ;
		}
		.bn-onboard-clickable {
			color: ${(props) => props.theme.colors.purpleHover} !important;
		}		
	}
`;

export default Layout;

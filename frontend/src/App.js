// 나 장수민이오.

import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Home from './pages/Home';
import Login from './pages/Login';
import RegisterFunnel from './pages/registerFunnel/RegisterFunnel';
import FilterFunnel from './pages/filterFunnel/FilterFunnel';
import FilterOption from './pages/FilterOption';

const GlobalStyle = createGlobalStyle`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
	*::placeholder {
    font-family: 'NotoSansKR', sans-serif;
    font-weight: 200;
  }
	html,
	body,
	div,
	span,
	applet,
	object,
	iframe,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	a,
	abbr,
	acronym,
	address,
	big,
	cite,
	code,
	del,
	dfn,
	em,
	img,
	ins,
	kbd,
	q,
	s,
	samp,
	small,
	strike,
	strong,
	sub,
	sup,
	tt,
	var,
	b,
	u,
	i,
	center,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	fieldset,
	form,
	label,
	legend,
	table,
	caption,
	tbody,
	tfoot,
	thead,
	tr,
	th,
	td,
	article,
	aside,
	canvas,
	details,
	embed,
	figure,
	figcaption,
	footer,
	header,
	hgroup,
	menu,
	nav,
	output,
	ruby,
	section,
	summary,
	time,
	mark,
	audio,
	video,
	button,
	input,
	textarea {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		font-family: 'NotoSansKR', sans-serif;
		vertical-align: baseline;
	}
	article,
	aside,
	details,
	figcaption,
	figure,
	footer,
	header,
	hgroup,
	menu,
	nav,
	button,
	textarea,
	section {
		display: block;
	}
	body {
		line-height: 1;
	}
	ol,
	ul {
		list-style: none;
	}
	blockquote,
	q {
		quotes: none;
	}
	blockquote:before,
	blockquote:after,
	q:before,
	q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
`;

const Theme = {
  colors: {
    primary: '#f5f5f5',
    secondary: '#ffffff',
  },
};

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<RegisterFunnel />}></Route>
        <Route path="/filter" element={<FilterFunnel />}></Route>
        <Route path="/filterOption" element={<FilterOption />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

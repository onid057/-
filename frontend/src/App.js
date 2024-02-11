// 나 장수민이오.

import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Home from './pages/Home'; // 홈 페이지
import Login from './pages/Login'; // 로그인 페이지
import UserMyPage from './pages/userMyPage/UserMyPage'; // 사용자 마이 페이지
import ConnectOption from './pages/connect/ConnectOption'; // 연동 옵션 고르기 페이지
import ConnectAsLeader from './pages/connect/ConnectAsLeader'; // 대표로 연동하기 페이지
import ConnectMember from './pages/connect/ConnectMember'; // 연동되어 있는 멤버 조회 페이지
import ConnectCode from './pages/connect/ConnectCode'; // 연동 코드 보여주는 페이지
import MapFunnel from './pages/mapFunnel/MapFunnel';

import RegisterFunnel from './pages/registerFunnel/RegisterFunnel';
import FilterFunnel from './pages/filterFunnel/FilterFunnel';
import MatchOption from './pages/MatchOption';
import NotFound from './pages/NotFound';
import StartMatch from './pages/StartMatch';
import Notify from './pages/notify/Notify';
import SuggestByZipsa from './pages/notify/SuggestByZipsa';
import SuggestByUser from './pages/notify/SuggestByUser';
import ExperimentCommonComponent from './pages/ExperimentCommonComponent';
import Reserve from './pages/reserve/Reserve';
// import ReserveDetail from './pages/reserve/ReserveDetail';
import UserRoomList from './pages/createRoomFunnel/UserRoomList';
import UserRoomDetail from './pages/createRoomFunnel/UserRoomDetail';
import CreateRoomFunnel from './pages/createRoomFunnel/CreateRoomFunnel';
import CompletedCreationRoom from './pages/createRoomFunnel/CompletedCreationRoom';
import ZipsaRoomList from './pages/zipsaRoom/ZipsaRoomList';
import ZipsaRoomDetail from './pages/zipsaRoom/ZipsaRoomDetail';

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
		-ms-overflow-style: none;
  	&::-webkit-scrollbar {
    	display: none;
  	}
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
        <Route path="/userMyPage" element={<UserMyPage />}></Route>
        <Route path="/connectOption" element={<ConnectOption />}></Route>
        <Route path="/connectAsLeader" element={<ConnectAsLeader />}></Route>
        <Route path="/connectMember" element={<ConnectMember />}></Route>
        <Route path="/connectCode/:option" element={<ConnectCode />}></Route>

        <Route path="/register" element={<RegisterFunnel />}></Route>
        <Route path="/filter" element={<FilterFunnel />}></Route>
        <Route path="/matchOption" element={<MatchOption />}></Route>

        <Route path="/startMatch" element={<StartMatch />}></Route>
        <Route path="/notify" element={<Notify />}></Route>
        <Route path="/suggest-by-zipsa" element={<SuggestByZipsa />}></Route>
        <Route
          path="/suggest-by-user/:notificationId"
          element={<SuggestByUser />}
        ></Route>

        <Route
          path="/experiment"
          element={<ExperimentCommonComponent />}
        ></Route>

        {/* 
					1. 한 명의 집사와의 매칭을 위해 정보 입력 Funnel
				*/}
        <Route path="/map" element={<MapFunnel />}></Route>

        {/* 
					1. 예약 화면 
				*/}
        <Route path="/reserve" element={<Reserve />}></Route>
        {/* <Route path="/reserveDetail" element={<ReserveDetail />}></Route> */}

        <Route path="*" element={<NotFound />}></Route>

        <Route path="/rooms" element={<UserRoomList />}></Route>
        <Route path="/rooms/create" element={<CreateRoomFunnel />}></Route>
        <Route
          path="/rooms/detail/:roomId"
          element={<UserRoomDetail />}
        ></Route>
        <Route path="/rooms/zipsa" element={<ZipsaRoomList />}></Route>
        <Route
          path="/rooms/zipsa/detail/:roomId"
          element={<ZipsaRoomDetail />}
        ></Route>
        <Route
          path="/rooms/complete"
          element={<CompletedCreationRoom />}
        ></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

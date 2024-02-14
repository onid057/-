// 나 장수민이오.

import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import UserMyPage from './pages/userMyPage/UserMyPage'; // 사용자 마이 페이지
import ConnectOption from './pages/connect/ConnectOption'; // 연동 옵션 고르기 페이지
import ConnectAsLeader from './pages/connect/ConnectAsLeader'; // 대표로 연동하기 페이지
import ConnectMember from './pages/connect/ConnectMember'; // 연동되어 있는 멤버 조회 페이지
import ConnectCode from './pages/connect/ConnectCode'; // 연동 코드 보여주는 페이지
import MapFunnel from './pages/mapFunnel/MapFunnel';
import UserProfileUpdate from './pages/userMyPage/UserProfileUpdate';
import PasswordUpdate from './pages/userMyPage/PasswordUpdate';
import ApplyZipsa from './pages/userMyPage/ApplyZipsa';
import Education from './pages/userMyPage/Education';
import InsertZipsaInfo from './pages/userMyPage/InsertZipsaInfo';
import MyBoardList from './pages/MyBoardList';
import UserActivityHistory from './pages/userMyPage/UserActivityHistory';
import PaymentRegistration from './pages/userMyPage/PaymentRegistration';

import RegisterFunnel from './pages/registerFunnel/RegisterFunnel';
import FilterFunnel from './pages/filterFunnel/FilterFunnel';
import MatchOption from './pages/MatchOption';

import NotFound from './pages/error/NotFound';
import NeedLogin from './pages/error/NeedLogin';

import StartMatch from './pages/StartMatch';
import Notify from './pages/notify/Notify';
import SuggestByUser from './pages/notify/SuggestByUser';
import Reserve from './pages/reserve/Reserve';
import ReserveDetail from './pages/reserve/ReserveDetail';
import UserRoomList from './pages/createRoomFunnel/UserRoomList';
import UserRoomDetail from './pages/createRoomFunnel/UserRoomDetail';
import CreateRoomFunnel from './pages/createRoomFunnel/CreateRoomFunnel';
import CompletedCreationRoom from './pages/createRoomFunnel/CompletedCreationRoom';
import ZipsaRoomList from './pages/zipsaRoom/ZipsaRoomList';
import ZipsaRoomDetail from './pages/zipsaRoom/ZipsaRoomDetail';
import BoardsMain from './pages/boards/BoardsMain';
import BoardsDetail from './pages/boards/BoardsDetail';
import UpdateBoard from './pages/boards/UpdateBoard';
import CreateBoard from './pages/boards/CreateBoard';

import TestLee from './pages/TestLee';
import ReportWriting from './pages/report/ReportWriting';
import ReportDetail from './pages/report/ReportDetail';
import ReportComplete from './pages/report/ReportComplete';
import RegisterSuccess from './pages/registerFunnel/RegisterSuccess';

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
		resize: none;
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
        <Route
          path="/userProfileUpdate"
          element={<UserProfileUpdate />}
        ></Route>
        <Route path="/passwordUpdate" element={<PasswordUpdate />}></Route>
        <Route path="/applyZipsa" element={<ApplyZipsa />}></Route>
        <Route path="/education" element={<Education />}></Route>
        <Route path="/insertZipsaInfo" element={<InsertZipsaInfo />}></Route>
        <Route path="/myBoards" element={<MyBoardList />}></Route>
        <Route
          path="/userActivityHistory"
          element={<UserActivityHistory />}
        ></Route>
        <Route
          path="/paymentRegistration"
          element={<PaymentRegistration />}
        ></Route>

        <Route path="/register" element={<RegisterFunnel />}></Route>
        <Route path="/registerSuccess" element={<RegisterSuccess />}></Route>
        <Route path="/filter" element={<FilterFunnel />}></Route>
        <Route path="/matchOption" element={<MatchOption />}></Route>

        <Route path="/startMatch" element={<StartMatch />}></Route>
        <Route path="/notify" element={<Notify />}></Route>
        <Route
          path="/suggest-by-user/:notificationId"
          element={<SuggestByUser />}
        ></Route>

        <Route path="/boards/" element={<BoardsMain />}></Route>
        <Route path="/boards/:boardId" element={<BoardsDetail />}></Route>
        <Route path="/boards/:boardId/update" element={<UpdateBoard />}></Route>
        <Route path="/boards/create" element={<CreateBoard />}></Route>

        {/* 
					1. 한 명의 집사와의 매칭을 위해 정보 입력 Funnel
				*/}
        <Route path="/map" element={<MapFunnel />}></Route>

        {/* 
					1. 예약 화면 
				*/}
        <Route path="/reserve" element={<Reserve />}></Route>
        <Route
          path="/reserveDetail/:roomId"
          element={<ReserveDetail />}
        ></Route>

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

        <Route path="/test/sumin" element={<TestLee />}></Route>
        <Route path="/report/:roomId" element={<ReportWriting />}></Route>
        <Route path="/reportDetail/:roomId" element={<ReportDetail />}></Route>
        <Route path="/reportComplete" element={<ReportComplete />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

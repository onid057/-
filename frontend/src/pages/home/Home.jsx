import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getUserState } from '../../apis/api/toggle.js';
import { getFirstReservation } from '../../apis/api/reserve.js'; // 추후 연결 요망
import { subscribeSSE } from '../../apis/api/subscribe.js';
import { useUserInfo } from '../../hooks/useUserInfo.js';
import { doLogOut, isQualifiedZipsa } from '../../apis/api/login.js';
import { calculateRemainDate, convertToHour } from '../../utils/time.js';

import Image from '../../components/common/Image.jsx';
import Paragraph from '../../components/common/Paragraph.jsx';
import Notice from '../../components/common/Notice.jsx';
import BoldText from '../../components/common/BoldText.jsx';
import MenuBar from '../../components/common/MenuBar.jsx';
import Toggle from '../../components/common/Toggle.jsx';
import Button from '../../components/common/Button.jsx';

const Wrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  padding: 20px 16px 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  font-weight: 300;
  white-space: pre-wrap;
`;
const HeadWrapper = styled.div`
  width: 100%;
  min-height: 509px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  font-weight: 300;
  white-space: pre-wrap;
`;
const ImageWrapper = styled.div`
  position: relative;
`;
const NoticeRound = styled.div`
  display: ${props => (props.$display ? 'default' : 'none')};
  position: absolute;
  right: -3px;
  top: -3px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #e83b46;
`;
const UpperWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NoticeWrapper = styled.div`
  display: flex;
  gap: 15px;
`;
const LoginRegisterWrapper = styled.div`
  width: 100%;
  padding: 20px 18px;
  display: flex;
  justify-content: space-evenly;
  background-color: ${({ theme }) => theme.colors.secondary};
  font-size: 16px;
  border-radius: 25px;
`;
const Login = styled.div`
  cursor: pointer;
`;
const Register = styled.div`
  cursor: pointer;
`;

export default function Home() {
  const [isWorked, setIsWorked] = useState();
  const [isZipsa, setIsZipsa] = useState();
  const [reserveInfo, setReserveInfo] = useState({});
  const { setUserState, setIsLoggedIn } = useUserInfo();
  const navigate = useNavigate();
  const eventSourceRef = useRef();
  const [isVisibleRound, setIsVisibleRound] = useState(false);
  const [diffTime, setDiffTime] = useState();

  const isLoggedIn = useUserInfo(state => state.isLoggedIn);
  const isRemainTimeLowerThanHalfOfHour = time =>
    time <= 1000 * 60 * 60 && time >= 0;

  useEffect(() => {
    if (isLoggedIn) {
      isQualifiedZipsa().then(response => {
        setIsZipsa(response.data);
        setUserState('USER');
      });
      getFirstReservation().then(response => {
        console.log(response);
        setReserveInfo(response.data);
        setDiffTime(
          new Date(reserveInfo?.expectationStartedAt).getTime() - new Date(),
        );
      });
    }
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     eventSourceRef.current = new EventSource(
  //       'http://localhost:8080' + `/sse`,
  //       // 'https://i10a407.p.ssafy.io/api' + `/sse`,
  //       {
  //         withCredentials: true,
  //       },
  //     );

  //     eventSourceRef.current.onopen = () => {
  //       console.log('Server와 연결');
  //     };

  //     eventSourceRef.current.onerror = error => {
  //       console.log(error);
  //     };

  //     eventSourceRef.current.onmessage = event => {
  //       console.log(event);
  //       setIsVisibleRound(true);
  //     };

  //     // eventSourceRef.current.addEventListener('sse', () => {
  //     //   setIsVisibleRound(true);
  //     // });
  //   }

  //   return () => {
  //     eventSourceRef.current.close();
  //   };
  // }, []);

  useEffect(() => {
    // 로그인이 무조건 되어야 하는 상태이고, 집사의 자격이 있는지 알아야 함(토글 버튼을 띄우기 위해)
    if (isLoggedIn && isZipsa) {
      getUserState().then(response => {
        setIsWorked(response.data.isWorked);
        setUserState(response.data.isWorked ? 'ZIPSA' : 'USER');
      });
    }
  }, [isZipsa, isWorked]);

  return (
    <Wrapper>
      <HeadWrapper>
        <UpperWrapper>
          <BoldText fontSize="30px" boldContent="한집사"></BoldText>

          <ImageWrapper>
            <NoticeRound $display={isVisibleRound}></NoticeRound>
            <Image
              src={process.env.PUBLIC_URL + '/images/alarm.svg'}
              width="30px"
              height="34px"
              onClick={() => navigate('/notify')}
              // onClick={() =>
              //   getComplaintList().then(response => console.log(response))
              // }
            ></Image>
          </ImageWrapper>
        </UpperWrapper>

        {isZipsa && (
          <Toggle isWorked={isWorked} setIsWorked={setIsWorked}></Toggle>
        )}

        {!isWorked ? (
          <>
            <Notice
              upper={[
                <Image
                  src={process.env.PUBLIC_URL + '/images/location.svg'}
                  width="30px"
                  height="30px"
                ></Image>,
                <Paragraph
                  fontSize="16px"
                  gap="5px"
                  sentences={['여러 명의 집사가', '주변에 기다리고 있어요.']}
                ></Paragraph>,
              ]}
              nextPage="/map"
            ></Notice>

            <Notice
              upper={[
                <Image
                  src={process.env.PUBLIC_URL + '/images/condition.svg'}
                  width="30px"
                  height="30px"
                  margin="0"
                ></Image>,
                <Paragraph
                  fontSize="16px"
                  gap="5px"
                  sentences={['좀 더 꼼꼼하게', '집사님을 찾고 있어요.']}
                ></Paragraph>,
              ]}
              nextPage="/filter"
            ></Notice>

            <Notice
              upper={[
                <Image
                  src={process.env.PUBLIC_URL + '/images/wifi.svg'}
                  width="30px"
                  height="30px"
                  margin="0"
                ></Image>,
                <Paragraph
                  fontSize="16px"
                  gap="5px"
                  sentences={['직접 집사님을', '모집해보고 싶어요.']}
                ></Paragraph>,
              ]}
              nextPage="/matchOption"
            ></Notice>
          </>
        ) : (
          <>
            {reserveInfo && (
              <Notice
                upper={[
                  <Image
                    src={process.env.PUBLIC_URL + '/images/lightning.svg'}
                    width="30px"
                    height="30px"
                    margin="4px 0 0 0"
                  ></Image>,
                  <BoldText
                    fontSize="20px"
                    boldContent={`{ ${reserveInfo.name} }`}
                    normalContent={' 고객님과'}
                  ></BoldText>,
                ]}
                lower={[
                  <Paragraph
                    fontSize="16px"
                    gap="10px"
                    sentences={[
                      <BoldText
                        boldContent={
                          reserveInfo.status === 'ONGOING'
                            ? '현재'
                            : isRemainTimeLowerThanHalfOfHour(diffTime)
                              ? `${Math.floor(diffTime / (1000 * 60))}분 후에`
                              : `${calculateRemainDate(reserveInfo?.expectationStartedAt)}`
                        }
                      ></BoldText>,
                      <BoldText
                        boldContent={
                          reserveInfo.majorCategoryName === '상관없음'
                            ? '약속'
                            : reserveInfo.majorCategoryName
                        }
                        normalContent={
                          reserveInfo.status === 'BEFORE'
                            ? '을 앞두고 있어요!'
                            : '을 진행 중이에요!'
                        }
                      ></BoldText>,
                    ]}
                  ></Paragraph>,
                ]}
                nextPage="/"
              ></Notice>
            )}
          </>
        )}
        <NoticeWrapper>
          <Notice
            upper={[
              <Image
                src={process.env.PUBLIC_URL + '/images/post.svg'}
                width="30px"
                height="30px"
                margin="0"
              ></Image>,
            ]}
            lower={[
              <Paragraph
                fontSize="14px"
                gap="5px"
                sentences={['다른 사용자들과', '소통하고 싶어요.']}
              ></Paragraph>,
            ]}
          ></Notice>

          <Notice
            upper={[
              <Image
                src={process.env.PUBLIC_URL + '/images/date.svg'}
                width="30px"
                height="30px"
                margin="0"
              ></Image>,
            ]}
            lower={[
              <Paragraph
                fontSize="14px"
                gap="5px"
                sentences={['예약 내역을', '보고 싶어요.']}
              ></Paragraph>,
            ]}
          ></Notice>
        </NoticeWrapper>
        {isLoggedIn ? (
          <Button
            mode="THIN_WHITE"
            onClick={() => {
              doLogOut().then(response => {
                console.log(response);
                window.localStorage.removeItem('user-storage');
              });
              setUserState('');
              setIsLoggedIn(false);
            }}
          >
            로그아웃
          </Button>
        ) : (
          <LoginRegisterWrapper>
            <Login onClick={() => navigate('/login')}>로그인</Login>
            <div>|</div>
            <Register onClick={() => navigate('/register')}>회원가입</Register>
          </LoginRegisterWrapper>
        )}
      </HeadWrapper>
      <MenuBar currentMenu="HOME" isWorked={isWorked}></MenuBar>
    </Wrapper>
  );
}

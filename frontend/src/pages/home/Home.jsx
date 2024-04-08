import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doLogOut, isQualifiedZipsa } from '../../apis/api/login.js';
import { getFirstReservation } from '../../apis/api/reserve.js'; // 추후 연결 요망
import { getUserState } from '../../apis/api/toggle.js';
import { useUserInfo } from '../../hooks/useUserInfo.js';
import { calculateRemainDate } from '../../utils/time.js';
import styled from 'styled-components';
import BoldText from '../../components/common/BoldText.jsx';
import Button from '../../components/common/Button.jsx';
import Image from '../../components/common/Image.jsx';
import MenuBar from '../../components/common/MenuBar.jsx';
import Notice from '../../components/common/Notice.jsx';
import Paragraph from '../../components/common/Paragraph.jsx';
import Toggle from '../../components/common/Toggle.jsx';

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
const IntroduceWrapper = styled.div`
  width: 100%;
  height: 220px;
  padding: 20px 18px;
  display: flex;
  align-items: center;
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
  border-radius: 25px;
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
  const userState = useUserInfo(state => state.userState);
  const isRemainTimeLowerThanHalfOfHour = time =>
    time <= 1000 * 60 * 60 && time >= 0;

  useEffect(() => {
    if (isLoggedIn) {
      isQualifiedZipsa().then(response => {
        setIsZipsa(response.data);
        setUserState('USER');
      });
      getFirstReservation().then(response => {
        setReserveInfo(response.data);
        setDiffTime(
          new Date(reserveInfo?.expectationStartedAt).getTime() -
            new Date().getTime(),
        );
      });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      eventSourceRef.current = new EventSource(
        'https://i10a407.p.ssafy.io/api' + `/sse`,
        {
          withCredentials: true,
        },
      );

      eventSourceRef.current.addEventListener('notification', event => {
        setIsVisibleRound(true);
      });
    }

    return () => {
      if (isLoggedIn) {
        eventSourceRef.current.close();
      }
    };
  }, []);

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
          <Image
            src={process.env.PUBLIC_URL + '/images/logo.svg'}
            width="140px"
            height="40px"
            margin="0 0 0 -23px"
            onClick={() => navigate('/')}
          ></Image>
          <ImageWrapper>
            <NoticeRound $display={isVisibleRound}></NoticeRound>
            <Image
              src={process.env.PUBLIC_URL + '/images/alarm.svg'}
              width="30px"
              height="34px"
              onClick={isLoggedIn ? () => navigate('/notify') : undefined}
            ></Image>
          </ImageWrapper>
        </UpperWrapper>

        {!isLoggedIn && (
          <IntroduceWrapper>
            <Paragraph
              gap={'15px'}
              fontSize={'30px'}
              sentences={[
                <BoldText
                  boldContent={'{ 한집사 }'}
                  normalContent={' 에'}
                ></BoldText>,
                '오신 것을',
                '환영합니다!',
              ]}
            ></Paragraph>
          </IntroduceWrapper>
        )}

        {isZipsa && isLoggedIn && (
          <Toggle isWorked={isWorked} setIsWorked={setIsWorked}></Toggle>
        )}

        {isLoggedIn &&
          (!isWorked ? (
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
                nextPage="/rooms/create"
              ></Notice>

              <Notice
                upper={[
                  <Image
                    src={process.env.PUBLIC_URL + '/images/coffee.svg'}
                    width="30px"
                    height="30px"
                    margin="0"
                  ></Image>,
                  <Paragraph
                    fontSize="16px"
                    gap="5px"
                    sentences={['내가 생성한', '공개방 목록 보기']}
                  ></Paragraph>,
                ]}
                nextPage="/rooms"
              ></Notice>
            </>
          ) : (
            <>
              {reserveInfo ? (
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
                  nextPage="/reserve"
                ></Notice>
              ) : (
                <Notice
                  upper={[
                    <Image
                      src={process.env.PUBLIC_URL + '/images/lightning.svg'}
                      width="30px"
                      height="30px"
                      margin="4px 0 0 0"
                    ></Image>,
                    <BoldText
                      fontSize="18px"
                      normalContent={'예정된 일정이 없습니다'}
                    ></BoldText>,
                  ]}
                ></Notice>
              )}
              <Notice
                upper={[
                  <Image
                    src={process.env.PUBLIC_URL + '/images/lightning.svg'}
                    width="30px"
                    height="30px"
                    margin="4px 0 0 0"
                  ></Image>,
                  <BoldText
                    fontSize="18px"
                    normalContent={'공개방 확인하기'}
                  ></BoldText>,
                ]}
                nextPage="/rooms/zipsa"
              ></Notice>
            </>
          ))}
        {isLoggedIn && (
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
              nextPage={'/boards'}
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
              nextPage={'/reserve'}
            ></Notice>
          </NoticeWrapper>
        )}

        {!isLoggedIn && (
          <Notice
            upper={[
              <Image
                src={process.env.PUBLIC_URL + '/images/lightning.svg'}
                width="30px"
                height="30px"
                margin="4px 0 0 0"
              ></Image>,
              <Paragraph
                fontSize="16px"
                gap="5px"
                sentences={['서비스를 이용하기 위해', '로그인이 필요합니다.']}
              ></Paragraph>,
              ,
            ]}
          ></Notice>
        )}

        {isLoggedIn ? (
          <Button
            mode="THIN_WHITE"
            onClick={() => {
              doLogOut().then(response => {
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
      <MenuBar
        currentMenu="HOME"
        isWorked={userState === 'ZIPSA'}
        disabled={!isLoggedIn}
      ></MenuBar>
    </Wrapper>
  );
}

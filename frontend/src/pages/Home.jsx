import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getUserState } from '../apis/api/toggle.js';
import { subscribeSSE } from '../apis/api/subscribe.js';
import { getComplaintList } from '../apis/api/admin.js';
import { useUserInfo } from '../hooks/useUserInfo.js';

import Image from '../components/common/Image.jsx';
import Paragraph from '../components/common/Paragraph.jsx';
import Notice from '../components/common/Notice.jsx';
import BoldText from '../components/common/BoldText.jsx';
import MenuBar from '../components/common/MenuBar.jsx';
import Toggle from '../components/common/Toggle.jsx';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 20px 16px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  font-weight: 300;
  white-space: pre-wrap;
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

export default function Home() {
  const [isWorked, setIsWorked] = useState();
  const { setUserState } = useUserInfo();
  const navigate = useNavigate('/notify');
  // const eventSourceRef = useRef();

  const userState = useUserInfo(state => state.userState);

  const isLoggedIn = useUserInfo(state => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      getUserState().then(response => {
        setIsWorked(response.data.isWorked);
        setUserState(response.data.isWorked ? 'ZIPSA' : 'USER');
      });
    }

    // eventSourceRef.current = new EventSource(
    //   'https://i10a407.p.ssafy.io/api' + `/sse/3`,
    //   { withCredentials: true },
    // );

    // console.log({ eventSourceRef });

    // eventSourceRef.current.onopen = () => {
    //   console.log('Server와 연결');
    // };

    // eventSourceRef.current.onerror = error => {
    //   console.log(error);
    // };

    // eventSourceRef.current.onmessage = event => {
    //   console.log(event);
    // };

    // eventSource.addEventListener('sse', event => {
    //   console.log(event);
    // })
  }, [isWorked]);

  return (
    <Wrapper>
      <UpperWrapper>
        <BoldText fontSize="30px" boldContent="한집사"></BoldText>

        <Image
          src={process.env.PUBLIC_URL + '/images/alarm.svg'}
          width="30px"
          height="34px"
          onClick={() => navigate('/notify')}
          // onClick={() =>
          //   getComplaintList().then(response => console.log(response))
          // }
        ></Image>
      </UpperWrapper>

      {isLoggedIn ? (
        <>
          <Toggle isWorked={isWorked} setIsWorked={setIsWorked}></Toggle>

          {/* <Notice
          upper={[
            <Image
              src={process.env.PUBLIC_URL + '/images/lightning.svg'}
              width="30px"
              height="30px"
              margin="4px 0 0 0"
            ></Image>,
            <BoldText
              fontSize="20px"
              boldContent="{ 곽희웅 }"
              normalContent=" 고객님"
            ></BoldText>,
          ]}
          lower={[
            <Paragraph
              fontSize="16px"
              gap="10px"
              sentences={[
                <BoldText
                  boldContent="오늘 15:00"
                  normalContent=" 시에"
                ></BoldText>,
                <BoldText
                  boldContent="강아지 산책"
                  normalContent=" 을 맡겼어요!"
                ></BoldText>,
              ]}
            ></Paragraph>,
          ]}
          nextPage="/"
        ></Notice> */}

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
                sentences={[
                  <BoldText
                    boldContent="14"
                    normalContent=" 명의 집사가"
                  ></BoldText>,
                  '주변에 기다리고 있어요.',
                ]}
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
        </>
      ) : (
        <LoginRegisterWrapper>
          <div>로그인</div>
          <div>|</div>
          <div>회원가입</div>
        </LoginRegisterWrapper>
      )}

      <MenuBar currentMenu="HOME"></MenuBar>
    </Wrapper>
  );
}

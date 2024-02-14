import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import Accordian from '../../components/common/Accordian';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import { getZipsaRecords } from '../../apis/api/zipsaMyPage';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const ContentWrapper = styled.div`
  width: 100%;
  margin: 10px 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const DetailContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
`;

// ================================================================
// 집사 활동 내역 확인 API (아래는 예시)
const data = [
  {
    roomId: 3,
    name: 'user4',
    subCategoryName: '행복복지센터 가기',
    majorCategoryName: '동네 동행',
    content: '병원을 가고싶어요~',
    startedAt: '2024-02-01T04:43:58.000+00:00',
    endedAt: '2024-02-01T04:43:58.000+00:00',
    totalPay: 20000,
  },
  {
    roomId: 2073,
    name: 'user1',
    subCategoryName: '청소하기',
    majorCategoryName: '심부름',
    content: '병원을 가고싶어요~',
    startedAt: '2024-02-01T04:43:58.000+00:00',
    endedAt: '2024-02-01T04:43:58.000+00:00',
    totalPay: 20000,
  },
];

// ================================================================

function ZipsaActivityHistory() {
  // NavigationBar 사용 위한 변수 선언
  const navigate = useNavigate();
  const onPrevious = () => {
    navigate(`/zipsa/mypage`);
  };

  // 집사 활동 내역 목록 확인 API 호출
  // const [data, setData] = useState();
  // useEffect(() => {
  //   getZipsaRecords().then(response => {
  //     // console.log('집사 활동 내역 목록 조회 성공')
  //     setData(response.data);
  //   });
  // }, []);

  return (
    <Wrapper>
      <NavigationBar
        leftContent={
          <Image
            src={`${process.env.PUBLIC_URL}/images/keyboard_arrow_left.svg`}
            width={'40px'}
            height={'40px'}
            margin={'0 0 0 -12px'}
          ></Image>
        }
        onPrevious={onPrevious}
      ></NavigationBar>

      <Paragraph
        margin={'0 0 30px 0'}
        gap="5px"
        fontSize="35px"
        sentences={['나의', '집사 활동 내역']}
      ></Paragraph>

      {data.map((data, idx) => (
        <Accordian
          key={idx}
          title={
            <Paragraph
              gap={'5px'}
              fontSize={'20px'}
              sentences={[
                <BoldText
                  fontSize={'20px'}
                  boldContent={`${data.name}`}
                  normalContent={' 고객님의'}
                />,
                <BoldText
                  fontSize={'20px'}
                  boldContent={`${data.majorCategoryName}`}
                  normalContent={' 을 맡았어요'}
                />,
              ]}
            ></Paragraph>
          }
          content={
            <ContentWrapper>
              <DetailContentWrapper>
                <span>맡은 일</span>
                <BoldText
                  fontSize={'16px'}
                  boldContent={data.subCategoryName}
                  normalContent={null}
                ></BoldText>
              </DetailContentWrapper>

              <DetailContentWrapper>
                <span>날짜</span>
                <BoldText
                  fontSize={'16px'}
                  boldContent={data.startedAt.substr(0, 10).replace(/-/gi, '.')}
                  normalContent={null}
                ></BoldText>
              </DetailContentWrapper>

              <DetailContentWrapper>
                <span>시작 시간</span>
                <BoldText
                  fontSize={'16px'}
                  boldContent={`${data.startedAt.substr(11, 2)}시 ${data.startedAt.substr(14, 2)}분`}
                  normalContent={null}
                ></BoldText>
              </DetailContentWrapper>

              <DetailContentWrapper>
                <span>끝난 시간</span>
                <BoldText
                  fontSize={'16px'}
                  boldContent={`${data.endedAt.substr(11, 2)}시 ${data.endedAt.substr(14, 2)}분`}
                  normalContent={null}
                ></BoldText>
              </DetailContentWrapper>

              <DetailContentWrapper>
                <span>받은 금액</span>
                <BoldText
                  fontSize={'16px'}
                  boldContent={`${data.totalPay.toLocaleString()} 원`}
                  normalContent={null}
                ></BoldText>
              </DetailContentWrapper>
            </ContentWrapper>
          }
        ></Accordian>
      ))}
    </Wrapper>
  );
}

export default ZipsaActivityHistory;

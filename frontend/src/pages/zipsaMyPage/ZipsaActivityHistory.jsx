import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import Accordian from '../../components/common/Accordian';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';

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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

// 집사 활동 내역 확인 API (아래는 예시)
const zipsaData = [
  {
    name: '피치피치어피치',
    profileImage: null,
    subCategoryName: '함께 산책하기',
    majorCategoryName: '동네 동행',
    content: '함께 산책하러 가요.',
    estimateDuration: 3,
    roomCreatedAt: '2024-01-30T02:09:41.000+00:00',
    matchCreatedAt: '2024-01-30T02:09:41.000+00:00',
    isReported: false,
    reportCycle: 0,
    isPublic: false,
    startedAt: '2024-01-30T02:09:41.000+00:00',
    endedAt: '2024-01-30T03:09:41.000+00:00',
    expectationStartedAt: '2024-01-30T02:09:41.000+00:00',
    expectationEndedAt: '2024-01-30T02:09:41.000+00:00',
    expectationPay: 20000,
    totalPay: 20000,
  },
  {
    name: '주먹쥔라이언',
    profileImage: null,
    subCategoryName: '키오스크 수업하기',
    majorCategoryName: '기타',
    content:
      '집앞에 있는 음식점에 키오스크가 생겼어요. 키오스크로 혼자서 주문할 수 있게 가르쳐주세요.',
    estimateDuration: 3,
    roomCreatedAt: '2024-01-30T02:09:41.000+00:00',
    matchCreatedAt: '2024-01-30T02:09:41.000+00:00',
    isReported: false,
    reportCycle: 0,
    isPublic: false,
    startedAt: '2024-01-30T02:09:41.000+00:00',
    endedAt: '2024-01-30T02:10:41.000+00:00',
    expectationStartedAt: '2024-01-30T02:09:41.000+00:00',
    expectationEndedAt: '2024-01-30T02:09:41.000+00:00',
    expectationPay: 20000,
    totalPay: 20000,
  },
];

function ZipsaActivityHistory() {
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
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={['나의', '집사 활동 내역']}
      ></Paragraph>

      {/* 왜 화살표 함수에 {} 대신 ()를 쓰는거지? */}
      {zipsaData.map((data, idx) => (
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
            <Paragraph
              sentences={[
                data.subCategoryName,
                data.startedAt.substr(0, 10).replace(/-/gi, '.'),
                `${data.startedAt.substr(11, 2)}시 ${data.startedAt.substr(14, 2)}분`,
                `${data.endedAt.substr(11, 2)}시 ${data.endedAt.substr(14, 2)}분`,
                `${data.totalPay.toLocaleString()} 원`,
              ]}
            ></Paragraph>
          }
        ></Accordian>
      ))}
    </Wrapper>
  );
}

export default ZipsaActivityHistory;

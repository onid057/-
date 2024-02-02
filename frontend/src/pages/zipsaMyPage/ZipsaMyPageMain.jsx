import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import TwoIndex from '../../components/zipsamypage/TwoIndex';
import Notice from '../../components/common/Notice';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import Image from '../../components/common/Image';

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

const MenuText = styled.div`
  width: ${props => props.width || '200px'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 집사 상세정보 API 조회해 오기
const zipsaData = {
  name: '이수민',
  birth: '2024-01-23T14:25:12.000+00:00',
  gender: 'man',
  address: '서울시 강서구',
  profileImage: null,
  latitude: 37.54815556,
  longitude: 126.851675,
  gradeId: 1,
  gradeName: '견습',
  salary: 5000,
  description: '옆집 아줌마처럼 친근한 사람이예요! 동네에서 친해져요!',
  preferTag: '저는 운전을 잘합니다.',
  serviceCount: 1,
  replyAverage: 0.0,
  replyCount: 0,
  kindnessAverage: 4.3,
  skillAverage: 3.5,
  rewindAverage: 2.7,
  reviews: [
    {
      userName: 'user4',
      profileImage: null,
      content: '나쁘지 않았습니다.',
      kindnessScore: 3,
      skillScore: 5,
      rewindScore: 7,
      createdAt: '2024-01-23T14:25:13.000+00:00',
    },
  ],
  subCategory: ['병원 동행', '마트 동행', '식사 돌봄'],
};

function ZipsaMyPageMain() {
  const MenuList = ['활동 내역 보기', '정산하기', '작성한 게시물 확인하기'];
  const number =
    (zipsaData.kindnessAverage +
      zipsaData.skillAverage +
      zipsaData.rewindAverage) /
    3;
  const avgScore = number.toFixed(2);
  console.log(avgScore);

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

      {/* 여기서 ProfileUpdate 페이지로 넘어가는데 페이지가 넘어갈 때는 data를 어떻게 보내지? */}
      <Notice
        upper={[
          <Image
            src={`${process.env.PUBLIC_URL}/images/profile_img.svg`}
            width={'60px'}
            height={'60px'}
            margin={'0px'}
          ></Image>,
          <Paragraph
            gap={'10px'}
            fontSize={'13px'}
            sentences={[
              <BoldText
                fontSize={'20px'}
                boldContent={'장수민'}
                normalContent={' 집사님'}
              ></BoldText>,
              '내 정보 수정하기',
            ]}
          ></Paragraph>,
        ]}
        lower={null}
        // Profile Update 페이지로 이동하도록 설정
        // nextPage={}
        padding={'15px 0px'}
      ></Notice>

      <TwoIndex
        name={zipsaData.name}
        gradeId={zipsaData.gradeId}
        gradeName={zipsaData.gradeName}
        avgScore={avgScore}
      ></TwoIndex>

      {MenuList.map((content, idx) => (
        <Notice
          key={idx}
          upper={[
            <MenuText width="270px">
              <BoldText
                fontSize={'18px'}
                boldContent={null}
                normalContent={content}
              ></BoldText>
              <Image
                src={process.env.PUBLIC_URL + '/images/right_arrow.svg'}
                width={'24px'}
                height={'24px'}
                margin={'0'}
              ></Image>
            </MenuText>,
          ]}
          lower={null}
          // 각자 페이지로 이동하기
          nextPage={''}
          padding={'20px 12px'}
        ></Notice>
      ))}
    </Wrapper>
  );
}

export default ZipsaMyPageMain;

import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Notice from '../../components/common/Notice';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import Image from '../../components/common/Image';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 60px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 300;
  white-space: pre-wrap;
`;

// 집사 상세정보 조회해 오기
const zipsaInfo = {
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
  description: '열심히 하겠습니다.',
  preferTag: '저는 운전을 잘합니다.',
  serviceCount: 1,
  replyAverage: 0.0,
  replyCount: 0,
  kindnessAverage: 0.0,
  skillAverage: 0.0,
  rewindAverage: 0.0,
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
  return (
    <Wrapper>
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
        // 내 정보 수정 페이지로 이동하도록 설정
        nextPage={'/'}
        padding={'15px 0px'}
      ></Notice>

      {/* <Image
        src={`${process.env.PUBLIC_URL}/images/room_1.svg`}
        width={'150px'}
        height={'150px'}
      ></Image> */}
    </Wrapper>
  );
}

export default ZipsaMyPageMain;

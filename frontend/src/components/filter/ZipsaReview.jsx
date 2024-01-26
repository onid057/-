import styled from 'styled-components';
import Image from '../common/Image';

const Wrapper = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: 28px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-weight: light;
  background-color: #ffffff;
  border-radius: 25px;
`;

const Title = styled.div`
  width: 100%;
  height: 25px;
  font-size: 16px;
  font-weight: normal;
`;

const Content = styled.div`
  width: 100%;
  height: auto;
  display: flex;
`;

const ProfileImg = styled.div`
  width: 100%;
  height: auto;
  flex: 2;
  background-color: red;
`;

const ProfileCnt = styled.div`
  width: 100%;
  height: 30px;
  flex: 8;
  font-size: 15px;
  background-color: blue;
`;

const Name = styled.span`
  font-weight: bold;
`;

const Infos = styled.div``;

const Text = styled.div``;

function ZipsaReview() {
  const reviews = [
    {
      userName: '장수민',
      profileImage: null,
      content: '완전 추천합니다.',
      kindnessScore: 3.2,
      skillScore: 4.3,
      rewindScore: 2.8,
      createdAt: '2024-01-23T14:25:13.000+00:00',
    },
    {
      userName: '곽희웅',
      profileImage: null,
      content: '그냥 그랬어요',
      kindnessScore: 2.8,
      skillScore: 3.5,
      rewindScore: 2.7,
      createdAt: '2024-01-23T14:25:13.000+00:00',
    },
  ];
  const reviewCount = reviews.length;

  return (
    <Wrapper>
      <Title>이용자 리뷰 ({reviewCount}건)</Title>
      <Content>
        <ProfileImg>
          <Image
            src={'/images/profile_img.svg'}
            width={'60px'}
            height={'60px'}
          ></Image>
        </ProfileImg>
        <ProfileCnt>
          <Name>열심히 사는 라이언</Name>
          <Infos></Infos>
        </ProfileCnt>
      </Content>
    </Wrapper>
  );
}

export default ZipsaReview;

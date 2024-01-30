import styled from 'styled-components';
import React, { useState } from 'react';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import ZipsaDetailProfile from '../../components/filter/ZipsaDetailProfile';
import ZipsaDetailRoute from '../../components/filter/ZipsaDetailRoute';

// 집사 상세정보를 서버에서 받아오는 부분?
// 일단 나오는지 보려고 예시로 넣어놨어요
const zipsaInfo = {
  name: '피치피치어피치',
  birth: '2024-01-23T14:25:12.000+00:00',
  gender: 'man',
  address: '서울시 강서구',
  profileImage: null,
  latitude: 37.54815556,
  longitude: 126.851675,
  gradeId: 1,
  gradeName: '견습',
  salary: 5000,
  description: '우리는 친구친구 열심히 동네에서 친구 만들어봐요 오호홍',
  preferTag: '산책하기#함께 장보기#병원 가기#자차 보유#요양보호사',
  serviceCount: 1,
  replyAverage: 15.2,
  replyCount: 0,
  kindnessAverage: 3.0,
  skillAverage: 2.5,
  rewindAverage: 4.2,
  reviews: [
    {
      userName: '옆집사는 라이언',
      profileImage: null,
      content: '나쁘지 않았습니다.',
      kindnessScore: 3,
      skillScore: 5,
      rewindScore: 7,
      createdAt: '2024-01-23T14:25:13.000+00:00',
    },
    {
      userName: '윗집사는 무지',
      profileImage: null,
      content: '음청좋았어요 짱짱짱 가나다라마바사',
      kindnessScore: 3,
      skillScore: 5,
      rewindScore: 4,
      createdAt: '2024-01-23T14:25:13.000+00:00',
    },
  ],
  subCategory: ['병원 동행', '마트 동행', '식사 돌봄'],
};

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const NavigationWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const BoldTextWrapper = styled.div`
  font-weight: bold;
`;

const NormalTextWrapper = styled.div`
  font-weight: normal;
`;

function ZipsaDetail({ onPrevious, onNext }) {
  // 클릭 이벤트 핸들러 함수 정의
  const [selectedCompo, setSelectedCompo] = useState('CATEGORY');

  const number =
    (zipsaInfo.kindnessAverage +
      zipsaInfo.skillAverage +
      zipsaInfo.rewindAverage) /
    3;
  const avgScore = number.toFixed(2);

  return (
    <Wrapper>
      <NavigationBar
        leftContent={
          <Image
            width="40px"
            height="40px"
            margin="0 0 0 -12px"
            src={process.env.PUBLIC_URL + '/images/left_arrow.svg'}
          ></Image>
        }
        // rightContent는 없앴어요
        onPrevious={onPrevious}
        onNext={onNext}
      ></NavigationBar>

      <ZipsaDetailProfile
        profileImage={zipsaInfo.profileImage}
        name={zipsaInfo.name}
        gradeId={zipsaInfo.gradeId}
        avgScore={avgScore}
        reviewCount={zipsaInfo.reviews.length}
        description={zipsaInfo.description}
      ></ZipsaDetailProfile>

      <NavigationWrapper>
        {selectedCompo === 'CATEGORY' ? (
          <BoldTextWrapper onClick={() => setSelectedCompo('CATEGORY')}>
            집사 전문분야
          </BoldTextWrapper>
        ) : (
          <NormalTextWrapper onClick={() => setSelectedCompo('CATEGORY')}>
            집사 전문분야
          </NormalTextWrapper>
        )}

        {selectedCompo === 'HISTORY' ? (
          <BoldTextWrapper onClick={() => setSelectedCompo('HISTORY')}>
            집사 활동내역
          </BoldTextWrapper>
        ) : (
          <NormalTextWrapper onClick={() => setSelectedCompo('HISTORY')}>
            집사 활동내역
          </NormalTextWrapper>
        )}

        {selectedCompo === 'REVIEW' ? (
          <BoldTextWrapper onClick={() => setSelectedCompo('REVIEW')}>
            고객 리뷰
          </BoldTextWrapper>
        ) : (
          <NormalTextWrapper onClick={() => setSelectedCompo('REVIEW')}>
            고객 리뷰
          </NormalTextWrapper>
        )}
      </NavigationWrapper>

      {/* 컴포넌트가 출력되는 부분 */}
      <ZipsaDetailRoute
        component={selectedCompo}
        subCategory={zipsaInfo.subCategory}
        preferTag={zipsaInfo.preferTag}
        replyAverage={zipsaInfo.replyAverage}
        serviceCount={zipsaInfo.serviceCount}
        kindnessAverage={zipsaInfo.kindnessAverage}
        skillAverage={zipsaInfo.skillAverage}
        rewindAverage={zipsaInfo.rewindAverage}
        totalReview={zipsaInfo.reviews.length}
        reviews={zipsaInfo.reviews}
      ></ZipsaDetailRoute>
    </Wrapper>
  );
}

export default ZipsaDetail;

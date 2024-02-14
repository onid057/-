import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import ZipsaDetailProfile from '../../components/filter/ZipsaDetailProfile';
import ZipsaDetailRoute from '../../components/filter/ZipsaDetailRoute';
import {
  getDetailZipsaInfo,
  getReviewZipsaInfo,
} from '../../apis/api/zipsaMyPage';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

function ZipsaDetail() {
  // NavigationBar 사용 위한 변수 선언
  const navigate = useNavigate();
  const onPrevious = () => {
    navigate(-1);
  };

  // (간단) 집사 정보 조회 API 호출
  // (리뷰)집사 정보 조회 API 호출
  const location = useLocation();
  const helperId = location.state.helperId;
  const [data, setData] = useState({});
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    getDetailZipsaInfo(helperId).then(response => {
      console.log(response.data);
      setData(response.data);
    });

    getReviewZipsaInfo(helperId).then(response => {
      console.log(response.data);
      setReviews(response.data);
    });
  }, []);

  // 카테고리 변경 위한 변수 정의
  const [selectedCompo, setSelectedCompo] = useState('CATEGORY');

  // avgScore 계산하기
  const number =
    (data.kindnessAverage + data.skillAverage + data.rewindAverage) / 3;
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
        onPrevious={onPrevious}
      ></NavigationBar>

      <ZipsaDetailProfile
        profileImage={data.profileImage}
        name={data.name}
        gradeId={data.gradeId}
        avgScore={avgScore}
        reviewCount={reviews.length}
        description={data.description}
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

      <ZipsaDetailRoute
        helperId={helperId}
        component={selectedCompo}
      ></ZipsaDetailRoute>
    </Wrapper>
  );
}

export default ZipsaDetail;

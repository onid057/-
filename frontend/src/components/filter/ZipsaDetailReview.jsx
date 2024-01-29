import styled from 'styled-components';
import ReviewBox from '../common/ReviewBox';

const Wrapper = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: 23px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  font-weight: light;
  background-color: #ffffff;
  border-radius: 25px;
`;

const Title = styled.div`
  width: 100%;
  height: 25px;
  line-height: 25px;
  font-size: 16px;
  font-weight: normal;
`;

function ZipsaDetailReview({ totalReview, reviews }) {
  if (totalReview > 0) {
    return (
      <Wrapper>
        <Title>이용자 리뷰 {totalReview}건</Title>

        {reviews.map((review, index) => {
          return (
            <ReviewBox
              key={index}
              userName={review.userName}
              profileImage={review.profileImage}
              content={review.content}
              kindnessScore={review.kindnessScore}
              skillScore={review.skillScore}
              rewindScore={review.rewindScore}
              createdAt={review.createdAt}
            ></ReviewBox>
          );
        })}
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Title>아직 작성된 리뷰가 없습니다.</Title>
      </Wrapper>
    );
  }
}

export default ZipsaDetailReview;

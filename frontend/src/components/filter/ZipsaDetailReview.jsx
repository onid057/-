import styled from 'styled-components';
import Review from '../common/Review';
import ReviewBox from '../common/ReviewBox';

const Wrapper = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 15px;
  font-weight: 300;
  font-size: 15px;
  background-color: #ffffff;
  border-radius: 25px;
`;

const Title = styled.div`
  width: 100%;
  height: 25px;
  font-size: 15px;
  font-weight: 400;
`;

function ZipsaDetailReview({ totalReview, reviews }) {
  return totalReview ? (
    <Wrapper>
      <Title>총 {totalReview}건</Title>

      {reviews.map((review, index) => {
        return (
          <Review
            key={index}
            userName={review.userName}
            profileImage={review.profileImage}
            content={review.content}
            kindnessScore={review.kindnessScore}
            skillScore={review.skillScore}
            rewindScore={review.rewindScore}
            createdAt={review.createdAt}
          ></Review>
        );
      })}
    </Wrapper>
  ) : (
    <Wrapper>
      <Title>아직 작성된 리뷰가 없습니다.</Title>
    </Wrapper>
  );
}

export default ZipsaDetailReview;

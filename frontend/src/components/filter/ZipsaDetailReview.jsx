import styled from 'styled-components';
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
  gap: 10px;
  font-weight: 300;
  font-size: 15px;
  background-color: #ffffff;
  border-radius: 25px;
`;
const Title = styled.div`
  width: 100%;
  font-size: 15px;
`;

function ZipsaDetailReview({ totalReview, reviews }) {
  return totalReview ? (
    <Wrapper>
      <Title>총 {totalReview}건</Title>

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
  ) : (
    <Wrapper>
      <Title>아직 작성된 리뷰가 없습니다.</Title>
    </Wrapper>
  );
}

export default ZipsaDetailReview;

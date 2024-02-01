import styled from 'styled-components';

const TitleBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
  font-weight: light;
`;

// 집사 상세정보가 ProfileUpdate에서 넘어올 것임
const preferTag = '산책하기#함께 장보기#병원 가기#자차 보유#요양보호사';

function ZipsaProfileUpdate() {
  return (
    <>
      <TitleBox>이런 일을 잘해요!</TitleBox>
      {/* 수민이가 컴포넌트 만들어 주면 넣기 */}
    </>
  );
}

export default ZipsaProfileUpdate;

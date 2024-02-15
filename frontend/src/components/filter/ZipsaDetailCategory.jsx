import styled from 'styled-components';
import HorizontalLine from '../common/HorizontalLine';

const Wrapper = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 15px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
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

const TagContent = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  row-gap: 5px;
  column-gap: 8px;
  font-weight: 700;
  color: #629af9;
`;

const CategoryContent = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

function ZipsaDetailCategory({ subCategory, preferTagList }) {
  return (
    <Wrapper>
      <Title>이런 일을 잘해요!</Title>
      <TagContent>
        {preferTagList.map((tag, index) => {
          return <span key={index}># {tag}</span>;
        })}
      </TagContent>

      <HorizontalLine
        marginTop={'10px'}
        marginBottom={'10px'}
        width={'100%'}
        height={'0.5px'}
      ></HorizontalLine>

      <Title>이런 일을 많이 했어요!</Title>
      <CategoryContent>
        {subCategory.map((category, index) => {
          return (
            <span key={index}>
              {index + 1}.{' '}
              {category === '상관없음' ? '어느 일이나 다 잘해요!' : category}
            </span>
          );
        })}
      </CategoryContent>
    </Wrapper>
  );
}

export default ZipsaDetailCategory;

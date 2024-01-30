import styled from 'styled-components';
import HorizontalLine from '../common/HorizontalLine';

const Wrapper = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const TagContent = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  row-gap: 5px;
  column-gap: 8px;
`;

const CategoryContent = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

function ZipsaDetailCategory({ subCategory, preferTag }) {
  const zipsaTags = preferTag.split('#');

  return (
    <Wrapper>
      <Title>이런 일을 잘해요!</Title>
      <TagContent>
        {zipsaTags.map((tag, index) => {
          return <span key={index}># {tag}</span>;
        })}
      </TagContent>

      <HorizontalLine width={'100%'} height={'0.5px'}></HorizontalLine>

      <Title>이런 일을 많이 했어요!</Title>
      <CategoryContent>
        {subCategory.map((category, index) => {
          return (
            <span key={index}>
              {index + 1}. {category}
            </span>
          );
        })}
      </CategoryContent>
    </Wrapper>
  );
}

export default ZipsaDetailCategory;

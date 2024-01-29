import styled from 'styled-components';
import Button from '../common/Button';

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
  gap: 15px;
  font-weight: light;
  font-size: 16px;
  background-color: #ffffff;
  border-radius: 25px;
`;

const Title = styled.div`
  width: 100%;
  height: 25px;
  font-size: 16px;
  font-weight: normal;
`;

const TagContent = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  row-gap: 5px;
  column-gap: 15px;
`;

const CategoryContent = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  gap: 3px;
`;

const Horizon = styled.hr`
  width: 100%;
  height: 0.5px;
  background-color: #d2d2d2;
  border: 0;
`;

function ZipsaDetailCategory({ subCategory, preferTag }) {
  const zipsaTags = preferTag.split('#');

  return (
    <Wrapper>
      <Title>집사가 등록한 태그</Title>
      <TagContent>
        {zipsaTags.map((tag, index) => {
          return <span key={index}># {tag}</span>;
        })}
      </TagContent>

      <Horizon></Horizon>

      <Title>많이 수행한 소분류 3개</Title>
      <CategoryContent>
        {subCategory.map((category, index) => {
          return (
            <Button
              key={index}
              mode="FULL_PERCENT_WHITE"
              bgcolor="#DCEAF4"
              msg={category}
            ></Button>
          );
        })}
      </CategoryContent>
    </Wrapper>
  );
}

export default ZipsaDetailCategory;

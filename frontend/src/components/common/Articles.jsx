import { styled } from 'styled-components';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const ContentBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: 13px 15px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-weight: light;
  font-size: 18px;
  color: gray;
  background-color: #ffffff;
  border-radius: 25px;
`;

function Articles() {
  return (
    <Wrapper>
      <ContentBox></ContentBox>
    </Wrapper>
  );
}

export default Articles;

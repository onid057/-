import styled from 'styled-components';

const Wrapper = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  height: 125px;
  padding: 13px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  font-size: 16px;
  background-color: #ffffff;
  border-radius: 25px;
`;

function TwoIndex() {
  return (
    <Wrapper>
      <h1></h1>
    </Wrapper>
  );
}

export default TwoIndex;

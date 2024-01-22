import { styled } from 'styled-components';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 30px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

function Gender({ onNext }) {
  return (
    <Wrapper>
      성별
      <button onClick={onNext}>이름 입력으로 이동</button>
    </Wrapper>
  );
}

export default Gender;

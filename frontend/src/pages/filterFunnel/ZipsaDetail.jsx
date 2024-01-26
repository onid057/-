import styled from 'styled-components';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 60px 16px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const Profile = styled.div``;

const Moveto = styled.div``;

function ZipsaDetail() {
  return (
    <Wrapper>
      <h1>ddd</h1>
    </Wrapper>
  );
}

export default ZipsaDetail;

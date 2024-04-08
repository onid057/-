import styled from 'styled-components';

const Wrapper = styled.div`
  width: ${props => (props.$width ? props.$width : '70px')};
  height: ${props => (props.$height ? props.$height : '18px')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  font-weight: 500;
  background-color: #d9d9d9;
  border-radius: 25px;
`;

function GenderBadge({ gender, width, height }) {
  const genderName = gender === 'WOMAN' ? '여성' : '남성';

  return (
    <Wrapper $width={width} $height={height}>
      {genderName}
    </Wrapper>
  );
}

export default GenderBadge;

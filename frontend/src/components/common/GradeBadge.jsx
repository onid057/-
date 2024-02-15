import styled from 'styled-components';

const Wrapper = styled.div`
  width: ${props => (props.$width ? props.$width : '70px')};
  height: ${props => (props.$height ? props.$height : '18px')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  font-weight: 500;
  background-color: ${props => props.$backgroundColor};
  border-radius: 25px;
`;

function GradeBadge({ grade, width, height }) {
  const [gradeName, gradeColor] =
    grade === 'APPRENTICE'
      ? ['견습 집사', '#e3fee8']
      : grade === 'NOVICE'
        ? ['초보 집사', '#dcf0f5']
        : grade === 'ADVANCED'
          ? ['숙련 집사', '#d9e0f5']
          : grade === 'PROFESSIONAL'
            ? ['프로 집사', '#8bc3eb']
            : ['전설 집사', '#93a0e3'];

  return (
    <Wrapper $width={width} $height={height} $backgroundColor={gradeColor}>
      {gradeName}
    </Wrapper>
  );
}

export default GradeBadge;

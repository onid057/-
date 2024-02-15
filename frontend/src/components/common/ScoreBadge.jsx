import styled from 'styled-components';
import Image from './Image';

const Wrapper = styled.div`
  width: ${props => (props.$width ? props.$width : '75px')};
  height: ${props => (props.$height ? props.$height : '18px')};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  font-weight: 500;
  background-color: #dcf0f5;
  border-radius: 25px;
`;

const TextWrapper = styled.div`
  margin-bottom: 2px;
`;

function ScoreBadge({ width, height, score, actCount }) {
  return (
    <Wrapper $width={width} $height={height}>
      <Image
        src={`${process.env.PUBLIC_URL}/images/small_dia.svg`}
        width={'15px'}
        height={'15px'}
      ></Image>
      <TextWrapper>
        {score.toFixed(2)}
        <span> </span>
        {actCount > 0 && <>({actCount})</>}
      </TextWrapper>
    </Wrapper>
  );
}

export default ScoreBadge;

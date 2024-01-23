import { styled } from 'styled-components';

const ParagraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.$gap};
  font-size: ${props => (props.$fontSize ? props.$fontSize : 'inherit')};
`;

function Paragraph({ gap, fontSize, sentences }) {
  return (
    <ParagraphWrapper $gap={gap} $fontSize={fontSize}>
      {sentences.map((sentence, index) => {
        return <div key={index}>{sentence}</div>;
      })}
    </ParagraphWrapper>
  );
}

export default Paragraph;

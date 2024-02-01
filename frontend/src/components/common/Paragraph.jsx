import { styled } from 'styled-components';

const ParagraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => (props.$gap ? props.$gap : '0')};
  font-size: ${props => (props.$fontSize ? props.$fontSize : 'inherit')};
  text-align: ${props => (props.$textAlign ? props.$textAlign : 'start')};
`;

function Paragraph({ gap, fontSize, sentences, textAlign }) {
  return (
    <ParagraphWrapper $gap={gap} $fontSize={fontSize} $textAlign={textAlign}>
      {sentences.map((sentence, index) => {
        return <div key={index}>{sentence}</div>;
      })}
    </ParagraphWrapper>
  );
}

export default Paragraph;

import styled from 'styled-components';

const ParagraphWrapper = styled.div`
  margin: ${props => (props.$margin ? props.$margin : '0')};
  display: flex;
  flex-direction: column;
  gap: ${props => (props.$gap ? props.$gap : '0')};
  font-size: ${props => (props.$fontSize ? props.$fontSize : 'inherit')};
  text-align: ${props => (props.$textAlign ? props.$textAlign : 'start')};
`;

function Paragraph({ margin, gap, fontSize, sentences, textAlign }) {
  return (
    <ParagraphWrapper
      $margin={margin}
      $gap={gap}
      $fontSize={fontSize}
      $textAlign={textAlign}
    >
      {sentences.map((sentence, index) => {
        return <div key={index}>{sentence}</div>;
      })}
    </ParagraphWrapper>
  );
}

export default Paragraph;

import { styled } from 'styled-components';

const ParagraphWrapper = styled.p`
  font-size: ${props => props.$fontSize};
  line-height: 1.3;
`;

function Paragraph({ fontSize, sentences }) {
  return (
    <ParagraphWrapper $fontSize={fontSize}>
      {sentences.map((sentence, index) => {
        return index !== sentences.length - 1 ? sentence + '\n' : sentence;
      })}
    </ParagraphWrapper>
  );
}

export default Paragraph;

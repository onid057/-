import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NoticeWrapper = styled.div`
  cursor: ${props => (props.$disabled ? 'default' : 'pointer')};
  width: 100%;
  padding: ${props => (props.$padding ? props.$padding : '20px 18px')};
  display: flex;
  flex-direction: column;
  gap: 28px;
  background-color: ${props => (props.$disabled ? '#0093e9' : '#ffffff')};
  background-image: ${props =>
    props.$disabled
      ? 'radial-gradient(circle 1224px at 10.6% 8.8%, rgba(255,255,255,1) 0%, rgba(153,202,251,1) 100.2%)'
      : 'none'};
  border-radius: 25px;
`;

const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 11px;
`;

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
`;

function Notice({ upper, lower, nextPage, padding, disabled }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(nextPage);
  };

  return (
    <NoticeWrapper
      onClick={handleClick}
      $padding={padding}
      $disabled={disabled}
    >
      {upper && (
        <FlexWrapper>
          {upper.map((component, index) => (
            <Fragment key={index}>{component}</Fragment>
          ))}
        </FlexWrapper>
      )}
      {lower && (
        <TextWrapper>
          {lower.map((component, index) => (
            <Fragment key={index}>{component}</Fragment>
          ))}
        </TextWrapper>
      )}
    </NoticeWrapper>
  );
}

export default Notice;

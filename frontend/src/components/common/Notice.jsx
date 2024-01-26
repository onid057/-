// 공통 알림 컴포넌트

import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const NoticeWrapper = styled.div`
  cursor: pointer;
  width: 288px;
  padding: ${props =>
    props.$padding ? props.$padding : '20px 12px 30px 12px'};
  display: flex;
  flex-direction: column;
  gap: 28px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 25px;
`;

// 추후에 width(너비) 수정 필요
const FlexWrapper = styled.div`
  width: 250px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 11px;
`;

const TextWrapper = styled.div`
  width: 250px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
`;

// upper에 컴포넌트 목록을 배열로 전달
// lower에 텍스트 전달
function Notice({ upper, lower, nextPage, padding }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(nextPage);
  };

  return (
    <NoticeWrapper onClick={handleClick} $padding={padding}>
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

// 공통 알림 컴포넌트

import { styled } from 'styled-components';

const NoticeWrapper = styled.div`
  width: ${props => props.$width};
  margin: ${props => (props.$margin ? props.$margin : 0)};
  padding: ${props => props.$padding};
  background-color: yellow;
  border-radius: 25px;
`;

// 추후에 width(너비) 수정 필요
const FlexWrapper = styled.div`
  width: 250px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextWrapper = styled.div`
  width: 250px;
  margin: 0 auto;
  text-align: left;
`;

// upper에 컴포넌트 목록을 배열로 전달
// lower에 텍스트 전달
export function Notice({ width, padding, margin, upper, lower }) {
  return (
    <NoticeWrapper $width={width} $margin={margin} $padding={padding}>
      {upper && (
        <FlexWrapper>
          {upper.map(component => (
            <div>{component}</div>
          ))}
        </FlexWrapper>
      )}
      {lower && <TextWrapper>{lower}</TextWrapper>}
    </NoticeWrapper>
  );
}

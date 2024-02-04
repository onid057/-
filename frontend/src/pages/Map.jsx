import { Map as KakaoMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 11px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

function Map() {
  return (
    <Wrapper>
      <KakaoMap
        center={{ lat: 37.506320759000715, lng: 127.05368251210247 }}
        style={{
          width: '320px',
          height: '568px',
        }}
      ></KakaoMap>
    </Wrapper>
  );
}

export default Map;

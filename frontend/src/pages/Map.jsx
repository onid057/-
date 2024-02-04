import {
  Map as KakaoMap,
  MarkerClusterer,
  MapMarker,
} from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import clusterPositionsData from '../chicken.json';

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

// Map 컴포넌트를 띄울 때, lat값과 lng값이 입력되어야 함.
function Map() {
  const [positions, setPositions] = useState([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  useEffect(() => {
    setPositions(clusterPositionsData.positions);
  }, []);

  const onClusterclick = () => {
    setIsBottomSheetOpen(true);
  };

  return (
    <Wrapper>
      <KakaoMap
        // center={{ lat: 37.506320759000715, lng: 127.05368251210247 }}
        center={{ lat: 36.2683, lng: 127.6358 }}
        style={{
          width: '320px',
          height: '568px',
        }}
        level={14}
        disableDoubleClickZoom={true}
        zoomable={false}
        draggable={false}
      >
        <MarkerClusterer
          averageCenter={true}
          minLevel={10}
          calculator={[10]}
          styles={[
            {
              width: '50px',
              height: '50px',
              background: 'rgba(232, 46, 28, .4)',
              borderRadius: '50%',
              textAlign: 'center',
              fontWeight: '500',
              lineHeight: '48px',
            },
          ]}
          disableClickZoom={true}
          onClusterclick={onClusterclick}
        >
          {positions.map(pos => (
            <MapMarker
              key={`${pos.lat}-${pos.lng}`}
              position={{
                lat: pos.lat,
                lng: pos.lng,
              }}
            />
          ))}
        </MarkerClusterer>
      </KakaoMap>
    </Wrapper>
  );
}

export default Map;

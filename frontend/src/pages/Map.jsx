import {
  Map as KakaoMap,
  MarkerClusterer,
  MapMarker,
} from 'react-kakao-maps-sdk';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import BottomSheet from '../components/common/BottomSheet';
import { getZipsaPositionWithinTwoKilos } from '../apis/api/map';
import { useQuery } from '@tanstack/react-query';

const Wrapper = styled.div`
  position: relative;
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

const data = [
  { lat: 37.510389, lng: 127.044645 },
  { lat: 37.506320759000715, lng: 127.05368251210247 },
  { lat: 37.506320759000715, lng: 127.05368251210247 },
  { lat: 37.494612, lng: 127.063642 },
];

// Map 컴포넌트를 띄울 때, lat값과 lng값이 입력되어야 함.
function Map() {
  const [isOpen, setIsOpen] = useState(false);
  const [targetCluster, setTargetCluster] = useState();
  const modalRef = useRef(null);

  // 현재 API 동작하지 않음
  // 중심 좌표 기준으로 2km 이내의 집사들의 lat, lng 값을 받아옴
  // const { data, isPending, error } = useQuery({
  //   queryKey: ['zipsaPositionWithinTwoKilos'],
  //   queryFn: () => getZipsaPositionWithinTwoKilos(2),
  // });

  // bottom sheet 영역 이외의 부분을 클릭 시 모달 isOpen 변경
  useEffect(() => {
    const closeBottomSheet = event => {
      isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        setIsOpen(false);
    };
    document.addEventListener('mousedown', closeBottomSheet);
    return () => {
      document.removeEventListener('mousedown', closeBottomSheet);
    };
  }, [isOpen]);

  const onClusterclick = (_target, cluster) => {
    const { Ma, La } = cluster.getCenter(); // Ma: 위도, La: 경도
    setTargetCluster({ lat: Ma, lng: La });
    setIsOpen(true);
  };

  return (
    <Wrapper>
      <KakaoMap
        center={{ lat: 37.506320759000715, lng: 127.05368251210247 }}
        style={{
          width: '320px',
          height: '568px',
        }}
        level={6}
        disableDoubleClickZoom={true}
        zoomable={false}
        draggable={false}
      >
        <MarkerClusterer
          averageCenter={true}
          minLevel={6}
          minClusterSize={1}
          calculator={[1]}
          styles={[
            {
              width: '50px',
              height: '50px',
              background: 'rgba(232, 46, 28, .5)',
              borderRadius: '50%',
              textAlign: 'center',
              fontWeight: '500',
              lineHeight: '50px',
            },
          ]}
          disableClickZoom={true}
          onClusterclick={onClusterclick}
        >
          {data.map((pos, index) => (
            <MapMarker
              key={`${pos.lat}-${pos.lng}-${index}`}
              position={{
                lat: pos.lat,
                lng: pos.lng,
              }}
            />
          ))}
        </MarkerClusterer>
      </KakaoMap>

      <BottomSheet
        isOpen={isOpen}
        ref={modalRef}
        onClick={() => setIsOpen(false)}
        targetCluster={targetCluster}
      ></BottomSheet>
    </Wrapper>
  );
}

export default Map;

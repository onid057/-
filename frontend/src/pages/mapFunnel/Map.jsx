import {
  Map as KakaoMap,
  MarkerClusterer,
  MapMarker,
} from 'react-kakao-maps-sdk';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import BottomSheet from '../../components/common/BottomSheet';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import { getZipsaPositionWithinTwoKilos } from '../../apis/api/map';

const Wrapper = styled.div`
  position: relative;
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 11px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 25px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const AbsoluteWrapper = styled.div`
  position: absolute;
  width: 320px;
  padding: 0 16px;
  z-index: 9999;
`;

// Map 컴포넌트를 띄울 때, lat값과 lng값이 입력되어야 함.
function Map({ onPrevious, onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false); // 상세 정보
  const [positions, setPositions] = useState([]);
  const [targetCluster, setTargetCluster] = useState();
  const [zipsaId, setZipsaId] = useState();
  const modalRef = useRef(null);

  // 중심 좌표 기준으로 2km 이내의 집사들의 lat, lng 값을 받아옴
  useEffect(() => {
    getZipsaPositionWithinTwoKilos().then(response => setPositions(response));
  }, []);

  // bottom sheet 영역 이외의 부분을 클릭 시 모달 isOpen 변경
  useEffect(() => {
    const closeBottomSheet = event => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
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
    setIsDetailOpen(false);
  };

  return (
    <Wrapper>
      <AbsoluteWrapper>
        <NavigationBar
          leftContent={
            <Image
              width="40px"
              height="40px"
              margin="0 0 0 -12px"
              src={process.env.PUBLIC_URL + '/images/left_arrow.svg'}
            ></Image>
          }
          rightContent="다음"
          onPrevious={onPrevious}
          onNext={() => onNext(zipsaId)}
          disabledOnNext={!zipsaId}
        ></NavigationBar>
      </AbsoluteWrapper>

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
              width: '70px',
              height: '70px',
              background: 'rgba(232, 46, 28, .4)',
              borderRadius: '50%',
              textAlign: 'center',
              fontWeight: '500',
              lineHeight: '70px',
            },
          ]}
          disableClickZoom={true}
          onClusterclick={onClusterclick}
        >
          {positions.map((pos, index) => (
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
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        ref={modalRef}
        onClick={() => {
          setIsOpen(false);
        }}
        targetCluster={targetCluster}
        setZipsaId={setZipsaId}
      ></BottomSheet>
    </Wrapper>
  );
}

export default Map;

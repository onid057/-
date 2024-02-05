import {
  Map as KakaoMap,
  MarkerClusterer,
  MapMarker,
} from 'react-kakao-maps-sdk';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import clusterPositionsData from '../chicken.json';
import BottomSheet from '../components/common/BottomSheet';
import { getZipsaListFromMap } from '../apis/api/map';
import GradeBadge from '../components/common/GradeBadge';
import Button from '../components/common/Button';

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

const NameWrapper = styled.div`
  cursor: pointer;
  width: 280px;
  margin: 0 auto;
  padding: 7px 19px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 25px;
`;

const DetailWrapper = styled.div`
  width: 100%;
  padding: 0 23px;
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const BadgeWrapper = styled.div`
  width: 280px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const GenderBadge = styled.div`
  width: 70px;
  height: 18px;
  padding-bottom: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  font-weight: 500;
  background-color: #d9d9d9;
  border-radius: 25px;
`;

const TextWrapper = styled.div`
  font-size: 14px;
`;

// Map 컴포넌트를 띄울 때, lat값과 lng값이 입력되어야 함.
function Map() {
  const [positions, setPositions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [targetZipsa, setTargetZipsa] = useState({});

  const modalRef = useRef(null);

  useEffect(() => {
    const closeModal = event => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', closeModal);
    return () => {
      document.removeEventListener('mousedown', closeModal);
    };
  }, [isOpen]);

  useEffect(() => {
    // getZipsaListFromMap(2).then(response => {
    //   console.log(response);
    //   setPositions(response.data);
    // });
    setPositions(clusterPositionsData.data);
  }, []);

  const onClusterclick = (_target, cluster) => {
    console.log(cluster.getCenter());
    setIsOpen(true);
    setIsDetailOpen(false);
  };

  return (
    <Wrapper>
      <KakaoMap
        center={{ lat: 37.506320759000715, lng: 127.05368251210247 }}
        // center={{ lat: 36.2683, lng: 127.6358 }}
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
        open={isOpen}
        title={isDetailOpen ? `${targetZipsa.name} 집사` : '집사 목록'}
        ref={modalRef}
        onClick={() => setIsOpen(false)}
      >
        {!isDetailOpen ? (
          positions.map((pos, index) => (
            <NameWrapper
              key={`${pos.name}-${index}`}
              onClick={() => {
                setIsDetailOpen(true);
                setTargetZipsa(pos);
              }}
            >
              {pos.name + ' 집사'}
            </NameWrapper>
          ))
        ) : (
          <DetailWrapper>
            <BadgeWrapper>
              <GenderBadge>{targetZipsa.gender}</GenderBadge>
              <GradeBadge grade={targetZipsa.gradeName}></GradeBadge>
            </BadgeWrapper>
            <TextWrapper>
              {targetZipsa.preferTag.split(',').map((tag, index) => (
                <span key={index}>{`#${tag} `}</span>
              ))}
            </TextWrapper>
            <TextWrapper>{targetZipsa.description}</TextWrapper>
            <Button mode="THIN_GRAY">집사에게 제안하기</Button>
          </DetailWrapper>
        )}
      </BottomSheet>
    </Wrapper>
  );
}

export default Map;

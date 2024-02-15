import styled from 'styled-components';
import Image from './Image';
import Button from './Button';
import GenderBadge from './GenderBadge';
import GradeBadge from './GradeBadge';
import PreferTag from './PreferTag';
import { getZipsaListFromMap } from '../../apis/api/map';
import { forwardRef, useState, useEffect } from 'react';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 320px;
  height: ${props =>
    props.$isOpen ? (props.$isDetailOpen ? '240px' : '270px') : '0'};
  overflow: scroll;
  transition: height 0.5s ease;
  display: flex;
  flex-direction: column;
  gap: 11px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 25px 25px 0 0;
  z-index: 9999;
`;
const Header = styled.div`
  width: 320px;
  padding: 21px 23px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NameWrapper = styled.div`
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  gap: 11px;
`;
const Name = styled.div`
  cursor: pointer;
  width: 280px;
  padding: 7px 19px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 25px;
`;
const Detail = styled.div`
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
const Text = styled.div`
  font-size: 14px;
`;

// isOpen은 bottom sheet 자체가 열렸는지 확인하는 boolean prop
// isDetailOpen은 bottom sheet 내에서 상세 정보가 열렸는지 확인하는 boolean prop
const BottomSheet = forwardRef(
  (
    {
      isOpen,
      isDetailOpen,
      setIsDetailOpen,
      onClick,
      targetCluster,
      setZipsaId,
    },
    ref,
  ) => {
    const [zipsaList, setZipsaList] = useState([]);
    const [targetZipsa, setTargetZipsa] = useState({}); // 현재 선택된 집사 한 명

    useEffect(() => {
      if (targetCluster) {
        getZipsaListFromMap(targetCluster.lat, targetCluster.lng).then(
          response => setZipsaList(response),
        );
      }
    }, [targetCluster]);

    return (
      <Wrapper $isOpen={isOpen} $isDetailOpen={isDetailOpen} ref={ref}>
        <Header>
          <>{isDetailOpen ? `${targetZipsa.zipsaName} 집사` : '집사 목록'}</>
          <Image
            src={`${process.env.PUBLIC_URL}/images/x.svg`}
            width="18px"
            height="18px"
            onClick={onClick}
          />
        </Header>

        {!isDetailOpen ? (
          <NameWrapper>
            {zipsaList?.map((zipsa, index) => (
              <Name
                key={`${zipsa.zipsaName}-${index}`}
                onClick={() => {
                  setIsDetailOpen(true);
                  setTargetZipsa(zipsa);
                }}
              >
                {zipsa.zipsaName + ' 집사'}
              </Name>
            ))}
          </NameWrapper>
        ) : (
          <Detail>
            <BadgeWrapper>
              <GenderBadge>{targetZipsa.gender}</GenderBadge>
              <GradeBadge grade={targetZipsa.gradeName}></GradeBadge>
            </BadgeWrapper>

            <PreferTag
              tagString={targetZipsa.preferTag}
              splitter={'#'}
              fontSize="14px"
            ></PreferTag>

            <Text>{targetZipsa.description}</Text>
            <Button
              mode="THIN_GRAY"
              onClick={() => setZipsaId([targetZipsa.zipsaId])}
            >
              집사 선택하기
            </Button>
          </Detail>
        )}
      </Wrapper>
    );
  },
);

export default BottomSheet;

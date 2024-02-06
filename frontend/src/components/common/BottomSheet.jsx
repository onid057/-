import styled from 'styled-components';
import Image from './Image';
import Button from './Button';
import GradeBadge from './GradeBadge';
import { getZipsaListFromMap } from '../../apis/api/map';
import { forwardRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 320px;
  height: ${props => (props.isOpen ? '300px' : '0')};
  overflow: hidden;
  transition: height 1s ease;
  display: flex;
  flex-direction: column;
  gap: 11px;
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

const Name = styled.div`
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

const Text = styled.div`
  font-size: 14px;
`;

const data = [
  {
    name: '곽희웅',
    gender: 'MAN',
    gradeName: 'APPRENTICE',
    description: '열심히 할까요',
    preferTag: '동네 동행,멀리 동행,배달,반려 동물',
    zipsaId: 7,
  },
  {
    name: '김세리',
    gender: 'MAN',
    gradeName: 'APPRENTICE',
    description: '잘 하겠습니다',
    preferTag: '동네 동행,멀리 동행,배달,반려 동물',
    zipsaId: 8,
  },
  {
    name: '이수민',
    gender: 'MAN',
    gradeName: 'APPRENTICE',
    description: '어떻게든 할게요',
    preferTag: '동네 동행,멀리 동행,배달,반려 동물',
    zipsaId: 9,
  },
  {
    name: '황준식',
    gender: 'MAN',
    gradeName: 'APPRENTICE',
    description: '잘 합니다',
    preferTag: '동네 동행,멀리 동행,배달,반려 동물',
    zipsaId: 10,
  },
];

// isOpen은 bottom sheet 자체가 열렸는지 확인하는 boolean prop
// isDetailOpen은 bottom sheet 내에서 상세 정보가 열렸는지 확인하는 boolean prop
const BottomSheet = forwardRef(({ isOpen, onClick, ...rest }, ref) => {
  let lat, lng;
  if (rest) {
    lat = rest.targetCluster?.lat;
    lng = rest.targetCluster?.lng;
  }

  // const { data, isPending, error } = useQuery({
  //   queryKey: 'zipsaListFromMap',
  //   queryFn: () => getZipsaListFromMap(lat, lng),
  //   enabled: !!lat && !!lng,
  // });

  const [targetZipsa, setTargetZipsa] = useState({}); // 현재 선택된 집사 한 명
  const [isDetailOpen, setIsDetailOpen] = useState(false); // 초기에 닫혀 있음

  return (
    <Wrapper isOpen={isOpen} ref={ref}>
      <Header>
        <>{isDetailOpen ? `${targetZipsa.name} 집사` : '집사 목록'}</>
        <Image
          src={`${process.env.PUBLIC_URL}/images/x.svg`}
          width="18px"
          height="18px"
          onClick={onClick}
        />
      </Header>

      {!isDetailOpen ? (
        data.map((zipsa, index) => (
          <Name
            key={`${zipsa.name}-${index}`}
            onClick={() => {
              setIsDetailOpen(true);
              setTargetZipsa(zipsa);
            }}
          >
            {zipsa.name + ' 집사'}
          </Name>
        ))
      ) : (
        <Detail>
          <BadgeWrapper>
            <GenderBadge>{targetZipsa.gender}</GenderBadge>
            <GradeBadge grade={targetZipsa.gradeName}></GradeBadge>
          </BadgeWrapper>
          <Text>
            {targetZipsa.preferTag.split(',').map((tag, index) => (
              <span key={index}>{`#${tag} `}</span>
            ))}
          </Text>
          <Text>{targetZipsa.description}</Text>
          <Button mode="THIN_GRAY">집사에게 제안하기</Button>
        </Detail>
      )}
    </Wrapper>
  );
});

export default BottomSheet;

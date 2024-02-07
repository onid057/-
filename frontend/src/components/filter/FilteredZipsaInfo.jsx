import styled from 'styled-components';
import Image from '../common/Image';
import GradeBadge from '../common/GradeBadge';
import ScoreBadge from '../common/ScoreBadge';
import PreferTag from '../common/PreferTag';

const Wrapper = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  height: 125px;
  padding: 13px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  font-size: 16px;
  box-shadow: ${props =>
    props.$isSelected ? '0 0 0 1px #629af9 inset' : 'none'};
  background-color: #ffffff;
  border-radius: 25px;
`;
const ZipsaContent = styled.div`
  width: 155px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const ZipsaName = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 700;
`;
const ZipsaInfos = styled.div`
  width: 100%;
  height: 18px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  font-size: 12px;
`;

function FilteredZipsaInfo({
  zipsaId,
  profileImage,
  name,
  gradeName,
  scoreAverage,
  serviceCount,
  categories,
  onClick,
  isSelected,
}) {
  return (
    <Wrapper onClick={onClick} $isSelected={isSelected}>
      {/* 추후에 여기에 profileImg 첨부 */}
      <Image
        src={`${process.env.PUBLIC_URL}/images/profile_img.svg`}
        width={'69px'}
        height={'69px'}
      ></Image>

      <ZipsaContent>
        <ZipsaName>{name}</ZipsaName>
        <ZipsaInfos>
          <GradeBadge grade={gradeName}></GradeBadge>
          <ScoreBadge score={scoreAverage} actCount={serviceCount}></ScoreBadge>
        </ZipsaInfos>

        <PreferTag tagArray={categories} fontSize="13px"></PreferTag>
      </ZipsaContent>

      <Image
        src={`${process.env.PUBLIC_URL}/images/right_arrow.svg`}
        width={'24px'}
        height={'24px'}
        margin={'0 -8px 0 0'}
      ></Image>
    </Wrapper>
  );
}

export default FilteredZipsaInfo;

import styled from 'styled-components';
import Image from '../../components/common/Image';
import CheckButton from '../../components/common/CheckButton';
import Paragraph from '../common/Paragraph';
import GradeBadge from '../../components/common/GradeBadge';
import ScoreBadge from '../common/ScoreBadge';

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
  // GradeBadge : 집사 등급
  // AvgScore : 평점 (kindness_average, skill_average, rewind_average의 평균 값)
  // ReviewCount : 리뷰 총 개수
  width: 100%;
  height: 18px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  font-size: 12px;
`;

function FilteredArticle({
  profile_image,
  zipsa_id,
  grade,
  score,
  reviews,
  tags,
}) {
  return (
    <Wrapper>
      <Image
        src={`${process.env.PUBLIC_URL}/images/profile_img.svg`}
        width={'69px'}
        height={'69px'}
      ></Image>

      <ZipsaContent>
        <ZipsaName>사과먹는 어피치</ZipsaName>
        <ZipsaInfos>
          <GradeBadge grade={1}></GradeBadge>
          <ScoreBadge score={3.8} actCount={127}></ScoreBadge>
        </ZipsaInfos>

        <Paragraph
          fontSize="13px"
          sentences={['# 산책하기 # 뛰기 # 날기', '# 널뛰기 # 잠자기']}
        ></Paragraph>
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

export default FilteredArticle;

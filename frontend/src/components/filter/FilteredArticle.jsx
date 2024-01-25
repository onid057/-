import styled from 'styled-components';
import Image from '../../components/common/Image';
import CheckButton from '../../components/common/CheckButton';
import GradeBadge from '../../components/common/GradeBadge';

const Wrapper = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  height: 134px;
  padding: 13px 10px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: light;
  font-size: 16px;
  background-color: #ffffff;
  border-radius: 25px;
`;

const ContentImg = styled.div`
  height: 100%;
  display: flex;
  flex: 2.8;
  align-items: center;
`;

const ContentZipsa = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 2px;
  flex: 6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  /* background-color: #cce4ed; */
`;

const ContentCheckButton = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-left: 4px;
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background-color: #deb8e0; */
`;

const ZipsaName = styled.div`
  width: 100%;
  padding-left: 4px;
  font-size: 15px;
  font-weight: bold;
  text-align: start;
`;

// 집사 배지, 평점, 댓글 수가 들어가는 div
const ZipsaInfos = styled.div`
  // GradeBadge : 집사 등급
  // AvgScore : 평점 (kindness_average, skill_average, rewind_average의 평균 값)
  // ReviewCount : 리뷰 총 개수
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  font-size: 12px;
  font-weight: bold;
`;

const ZipsaPreferTags = styled.div`
  width: 100%;
  height: auto;
  padding-left: 4px;
  line-height: 110%;
  font-size: 13px;
  font-weight: normal;
`;

// 집사 등급별 시급 * 시간
const ZipsaCalculatedSalary = styled.div`
  padding-left: 4px;
  font-size: 14px;
  font-weight: bold;
`;

const AvgScore = styled.span`
  display: flex;
`;

const ReviewCount = styled.span`
  margin-left: 2px;
  display: inline-block;
`;

// 여기서 ZipsaList로 보낼 props 다 정의해야 함...
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
      <ContentImg>
        <Image
          src={'/images/profile_img.svg'}
          width={'69px'}
          height={'69px'}
        ></Image>
      </ContentImg>

      <ContentZipsa>
        <ZipsaName>사과먹는 어피치</ZipsaName>
        <ZipsaInfos>
          <GradeBadge grade="1"></GradeBadge>
          <AvgScore>
            <Image
              src={'/images/small_dia.svg'}
              width={'15px'}
              height={'15px'}
            ></Image>
            3.8
          </AvgScore>
          <ReviewCount>(47)</ReviewCount>
        </ZipsaInfos>

        <ZipsaPreferTags>
          # 산책하기 # 뛰기 # 날기<br></br># 달리기 # 기기
        </ZipsaPreferTags>
        <ZipsaCalculatedSalary>
          <span>예상 금액 18,000원</span>
        </ZipsaCalculatedSalary>
      </ContentZipsa>

      <ContentCheckButton>
        <CheckButton></CheckButton>
      </ContentCheckButton>
    </Wrapper>
  );
}

export default FilteredArticle;

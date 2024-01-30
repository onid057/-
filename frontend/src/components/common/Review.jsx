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
  height: 100px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  font-size: 16px;
`;

const Content = styled.div`
  width: 155px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 700;
`;

const Infos = styled.div`
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

const Description = styled.div`
  word-break: break-all;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.2;
`;

function Review({
  userName,
  profileImage,
  content,
  kindnessScore,
  skillScore,
  rewindScore,
  createdAt,
}) {
  // AvgScore 계산 부분
  const number = (kindnessScore + skillScore + rewindScore) / 3;
  const avgScore = number.toFixed(2);

  // Date 계산 부분
  console.log(createdAt);
  console.log(typeof createdAt);
  const year = createdAt.substr(0, 4);
  console.log(year);

  const month = createdAt.substr(5, 2);
  console.log(month);

  const day = createdAt.substr(8, 2);
  console.log(day);

  return (
    <Wrapper>
      <Image
        src={`${process.env.PUBLIC_URL}/images/profile_img.svg`}
        width={'69px'}
        height={'69px'}
      ></Image>

      <Content>
        <Name>{userName}</Name>
        <Infos>
          <ScoreBadge score={avgScore}></ScoreBadge>
        </Infos>

        <Description>{content}...</Description>
      </Content>
    </Wrapper>
  );
}

export default Review;

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
  font-weight: 300;
  font-size: 12px;
`;

const Content = styled.div`
  width: 155px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.div`
  font-weight: 700;
`;

const Infos = styled.div`
  width: 100%;
  height: 18px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
`;

const Description = styled.div`
  word-break: break-all;
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

  const year = createdAt.substr(0, 4);
  const month = createdAt.substr(5, 2);
  const day = createdAt.substr(8, 2);

  return (
    <Wrapper>
      <Image
        src={`${process.env.PUBLIC_URL}/images/profile_img.svg`}
        width={'69px'}
        height={'69px'}
      ></Image>

      <Content>
        <Infos>
          <Name>{userName}</Name>| 3일 전
        </Infos>
        <ScoreBadge score={avgScore}></ScoreBadge>

        <Description>{content}...</Description>
      </Content>
    </Wrapper>
  );
}

export default Review;

import styled from 'styled-components';
import Image from './Image';
import ScoreBadge from './ScoreBadge';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 0;
  display: flex;
  justify-content: start;
  align-items: start;
`;

const RightBox = styled.div`
  width: 160px;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 10px;
`;

const Infos = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  gap: 13px;
`;

// const AvgScore = styled.span`
//   margin-left: 5px;
// `;

const Content = styled.div`
  font-size: 16px;
  font-weight: 400;
  word-break: break-all;
`;

const Date = styled.div`
  font-size: 14px;
  font-weight: 200;
`;

function ReviewBox({
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
        src={
          profileImage
            ? `${process.env.PUBLIC_URL}/images/${profileImage}.svg`
            : `${process.env.PUBLIC_URL}/images/profile_img.svg`
        }
        width={'69px'}
        height={'69px'}
        margin={'0 15px 0 0'}
      ></Image>

      <RightBox>
        <Infos>
          <span>{userName}</span>
          <ScoreBadge score={avgScore}></ScoreBadge>
        </Infos>

        <Content>{content}</Content>

        <Date>
          {year}/{month}/{day}
        </Date>
      </RightBox>
    </Wrapper>
  );
}

export default ReviewBox;

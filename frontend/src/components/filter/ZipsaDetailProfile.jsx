import styled from 'styled-components';
import Image from '../common/Image';
import GradeBadge from '../common/GradeBadge';
import ScoreBadge from '../common/ScoreBadge';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: 300;
  font-size: 16px;
`;

const RightBox = styled.div`
  max-width: 200px;
  height: 100px;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Name = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
`;

const Infos = styled.div`
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

function ZipsaDetailProfile({
  name,
  gradeId,
  avgScore,
  reviewCount,
  description,
}) {
  return (
    <Wrapper>
      <Image
        src={`${process.env.PUBLIC_URL}/images/profile_img.svg`}
        width={'70px'}
        height={'70px'}
      ></Image>

      <RightBox>
        <Name>{name}</Name>
        <Infos>
          <GradeBadge grade={gradeId}></GradeBadge>
          <ScoreBadge score={avgScore} actCount={reviewCount}></ScoreBadge>
        </Infos>
        <Description>"{description}"</Description>
      </RightBox>
    </Wrapper>
  );
}

export default ZipsaDetailProfile;

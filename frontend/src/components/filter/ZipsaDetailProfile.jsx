import styled from 'styled-components';
import Image from '../common/Image';
import GradeBadge from '../common/GradeBadge';
import ScoreBadge from '../common/ScoreBadge';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: 0 10px;
  display: flex;
  justify-content: start;
  align-items: start;
  font-weight: 300;
`;
const RightBox = styled.div`
  max-width: 200px;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: start;
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
  line-height: 1.2;
`;

function ZipsaDetailProfile({
  profileImage,
  name,
  gradeId,
  gradeName,
  avgScore,
  reviewCount,
  description,
}) {
  return (
    <Wrapper>
      <Image
        src={profileImage || `${process.env.PUBLIC_URL}/images/profile_img.svg`}
        width={'70px'}
        height={'70px'}
        margin={'5px 5px 0 0'}
      ></Image>

      <RightBox>
        <Name>{name}</Name>
        <Infos>
          <GradeBadge grade={gradeName}></GradeBadge>
          <ScoreBadge score={avgScore} actCount={reviewCount}></ScoreBadge>
        </Infos>
        <Description>"{description}"</Description>
      </RightBox>
    </Wrapper>
  );
}

export default ZipsaDetailProfile;

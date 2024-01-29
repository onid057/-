import styled from 'styled-components';
import Image from '../common/Image';
import GradeBadge from '../common/GradeBadge';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  display: flex;
  font-weight: light;
  font-size: 16px;
  /* background-color: #ffffff; */
`;

const LeftBox = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 5px;
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;

const RightBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 5px;
  flex: 7;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`;

const Name = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
`;

const Infos = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: bold;
`;

const AvgScore = styled.span`
  display: flex;
  gap: 3px;
`;

const ReviewCount = styled.span`
  margin-left: 5px;
`;

const Description = styled.div`
  word-break: keep-all;
  font-size: 14px;
  font-weight: light;
  line-height: 18px;
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
      <LeftBox>
        <Image
          src={`${process.env.PUBLIC_URL}/images/profile_img.svg`}
          width={'70px'}
          height={'70px'}
        ></Image>
        <GradeBadge grade={gradeId}></GradeBadge>
      </LeftBox>
      <RightBox>
        <Name>{name}</Name>
        <Infos>
          <AvgScore>
            <Image
              src={`${process.env.PUBLIC_URL}/images/small_dia.svg`}
              width={'15px'}
              height={'15px'}
            ></Image>
            {avgScore}
          </AvgScore>
          <ReviewCount>({reviewCount})</ReviewCount>
        </Infos>
        <Description>"{description}"</Description>
      </RightBox>
    </Wrapper>
  );
}

export default ZipsaDetailProfile;

import styled from 'styled-components';
import Image from './Image';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  display: flex;
`;

const LeftBox = styled.div`
  width: 100%;
  height: auto;
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightBox = styled.div`
  width: 100%;
  height: auto;
  padding-left: 10px;
  flex: 7;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 15px;
  /* background-color: blue; */
`;

const Name = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
`;

const Infos = styled.div`
  margin-top: 1px;
  display: flex;
  align-content: center;
  font-size: 14px;
  font-weight: bold;
`;

const AvgScore = styled.span`
  margin-left: 5px;
`;

const Date = styled.div`
  margin-left: 10px;
  font-weight: lighter;
`;

const Content = styled.div`
  word-break: break-all;
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
      <LeftBox>
        <Image
          src={`${process.env.PUBLIC_URL}/images/profile_img.svg`}
          width={'70px'}
          height={'70px'}
        ></Image>
      </LeftBox>
      <RightBox>
        <Name>{userName}</Name>
        <Infos>
          <Image
            src={`${process.env.PUBLIC_URL}/images/small_dia.svg`}
            width={'18px'}
            height={'18px'}
          ></Image>
          <AvgScore>{avgScore}</AvgScore>
          <Date>
            {year}/{month}/{day}
          </Date>
        </Infos>

        <Content>{content}</Content>
      </RightBox>
    </Wrapper>
  );
}

export default ReviewBox;

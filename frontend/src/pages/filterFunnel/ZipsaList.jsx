import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import Button from '../../components/common/Button';
import CheckButton from '../../components/common/CheckButton';
import GradeBadge from '../../components/common/GradeBadge';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 60px 16px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const TitleBox = styled.div`
  width: 100%;
  font-size: 35px;
`;

// Button 컴포넌트 상하 마진 주기 위한 div
const ButtonBox = styled.div`
  margin: 15px 0;
`;

const ContentBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 134px;
  padding: 13px 15px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: light;
  font-size: 16px;
  background-color: #ffffff;
  border-radius: 25px;
`;

const ContentZipsa = styled.div`
  width: 100%;
  height: 100%;
  flex: 8.8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
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

// 집사 등급별 시급 * 시간
const CalculatedSalary = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const ZipsaInfos = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const ZipsaImg = styled.div`
  width: 72px;
  height: 72px;
  background-image: url('/images/profile_img.svg');
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
`;

const ZipsaSpec = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
`;

const ZipsaName = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  text-align: start;
`;

// ZipsaResponsed : 사용자로부터 응답받은 데이터들
// GradeBadge : 집사 등급
// AvgScore : 평점 (kindness_average, skill_average, rewind_average의 평균 값)
// ReviewCount : 리뷰 총 개수
const ZipasResponsed = styled.div`
  width: 100%;
  height: 20px;
  background-color: red;
`;

// const GradeBadge = styled.span``;

const AvgScore = styled.span``;

const ReviewCount = styled.span``;

// 선호 태그
const ZipsaPreferTags = styled.div`
  width: 100%;
  height: 40px;
  background-color: blue;
`;

function TestLee() {
  return (
    <>
      {/* 아니 이거 왜 안나옴?? */}
      <NavigationBar></NavigationBar>

      <Wrapper>
        <TitleBox>
          <Paragraph
            sentences={[
              <BoldText
                fontSize="35px"
                boldContent="최대 5명"
                normalContent="의"
              ></BoldText>,
              '집사님을',
              '선택해 주세요',
            ]}
          ></Paragraph>
        </TitleBox>

        <ButtonBox>
          <Button
            mode={'NORMAL_BLUE'}
            color={'#629af9'}
            // msg에 몇 명이 선택했는지 받아서 보내기
            msg={'2/5명에게 요청 보내기'}
          ></Button>
        </ButtonBox>

        <GradeBadge grade="1"></GradeBadge>

        <ContentBox>
          <ContentZipsa>
            <CalculatedSalary>
              <span>예상 금액 18,000원</span>
            </CalculatedSalary>
            <ZipsaInfos>
              <ZipsaImg>
                {/* <img src="/images/profile_img.svg" alt="profile image" /> */}
              </ZipsaImg>
              <ZipsaSpec>
                <ZipsaName>사과먹는 어피치</ZipsaName>
                <ZipasResponsed></ZipasResponsed>
                <ZipsaPreferTags></ZipsaPreferTags>
              </ZipsaSpec>
            </ZipsaInfos>
          </ContentZipsa>

          <ContentCheckButton>
            <CheckButton></CheckButton>
          </ContentCheckButton>
        </ContentBox>
      </Wrapper>
    </>
  );
}

export default TestLee;

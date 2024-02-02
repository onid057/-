import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import ProgressBar from '../../components/common/ProgressBar';
import Button from '../../components/common/Button';
import GENDER from '../../constants/gender';
import AGE from '../../constants/age';
import GRADE from '../../constants/grade';
import SCORE from '../../constants/score';

import { useState } from 'react';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const ContentTitle = styled.div`
  width: 100%;
  font-size: 16px;
`;

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const GridBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 8px;
  grid-row-gap: 10px;
`;

// 앞에서 대분류 선택에 따라서 여기 subCategoryList가 달라져야 하는데 어떻게 하는지 잘 모르겠음...
function Condition({
  onPrevious,
  onNext,
  genderCondition,
  ageCondition,
  gradeCondition,
  scoreCondition,
}) {
  const [gender, setGender] = useState(genderCondition);
  const [age, setAge] = useState(ageCondition);
  const [grade, setGrade] = useState(gradeCondition);
  const [score, setScore] = useState(scoreCondition);

  return (
    <Wrapper>
      <NavigationBar
        leftContent={
          <Image
            width="40px"
            height="40px"
            margin="0 0 0 -12px"
            src={process.env.PUBLIC_URL + '/images/left_arrow.svg'}
          ></Image>
        }
        rightContent="다음"
        onPrevious={onPrevious}
        onNext={() => onNext(gender, age, grade, score)}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="집사의 조건" normalContent="을"></BoldText>,
          '정해 주세요',
        ]}
      ></Paragraph>

      <ProgressBar value={33}></ProgressBar>

      <ContentBox>
        <ContentTitle>성별</ContentTitle>
        <FlexBox>
          {['남성', '여성', '상관 없음'].map((option, index) => {
            return (
              <Button
                key={index}
                mode={gender === GENDER[option] ? 'THIN_BLUE' : 'THIN_WHITE'}
                onClick={() => setGender(GENDER[option])}
              >
                {option}
              </Button>
            );
          })}
        </FlexBox>
      </ContentBox>

      <ContentBox>
        <ContentTitle>연령</ContentTitle>
        <FlexBox>
          {['40세 미만', '40세 이상', '상관 없음'].map((option, index) => {
            return (
              <Button
                key={index}
                mode={age === AGE[option] ? 'THIN_BLUE' : 'THIN_WHITE'}
                onClick={() => setAge(AGE[option])}
              >
                {option}
              </Button>
            );
          })}
        </FlexBox>
      </ContentBox>

      <ContentBox>
        <ContentTitle>집사 등급</ContentTitle>
        <GridBox>
          {['견습 집사', '프로 집사', '전설 집사', '상관 없음'].map(
            (option, index) => {
              return (
                <Button
                  key={index}
                  mode={grade === GRADE[option] ? 'THIN_BLUE' : 'THIN_WHITE'}
                  onClick={() => setGrade(GRADE[option])}
                >
                  {option}
                </Button>
              );
            },
          )}
        </GridBox>
      </ContentBox>

      <ContentBox>
        <ContentTitle>다이아몬드 평점</ContentTitle>
        <GridBox>
          {['5 이상', '4 이상', '3 이상', '2 이상', '1 이상', '0 이상'].map(
            (option, index) => {
              return (
                <Button
                  key={index}
                  mode={
                    score === SCORE[option] ? 'DIAMOND_BLUE' : 'DIAMOND_WHITE'
                  }
                  onClick={() => setScore(SCORE[option])}
                >
                  {option}
                </Button>
              );
            },
          )}
        </GridBox>
      </ContentBox>
    </Wrapper>
  );
}

export default Condition;

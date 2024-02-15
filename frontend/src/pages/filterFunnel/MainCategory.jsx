import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import ProgressBar from '../../components/common/ProgressBar';
import Button from '../../components/common/Button';
import { useState } from 'react';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-weight: 300;
  white-space: pre-wrap;
`;
const ContentBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 20px;
  grid-column-gap: 7px;
`;

function MainCategory({ onPrevious, onNext, matchMainCategory }) {
  const [mainCategory, setMainCategory] = useState(matchMainCategory);

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
        rightContent={'다음'}
        onPrevious={onPrevious}
        onNext={() => onNext(mainCategory)}
        disabledOnNext={!mainCategory}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="어떤 일" normalContent="을"></BoldText>,
          '맡기고 싶으신가요?',
        ]}
      ></Paragraph>

      <ProgressBar value={11}></ProgressBar>

      <ContentBox>
        {[
          '동네 동행',
          '멀리 동행',
          '집안일',
          '배달',
          '목욕',
          '반려 동물',
          '교육',
          '기타',
        ].map((category, index) => {
          return (
            <Button
              key={index}
              mode={mainCategory === category ? 'THICK_BLUE' : 'THICK_WHITE'}
              onClick={() => setMainCategory(category)}
            >
              {category}
            </Button>
          );
        })}
      </ContentBox>
    </Wrapper>
  );
}

export default MainCategory;

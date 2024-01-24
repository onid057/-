import { useState, useEffect } from 'react';
import { styled } from 'styled-components';

import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import ProgressBar from '../../components/common/ProgressBar';
import Button from '../../components/common/Button';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
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
  justify-content: space-between;
`;

function MainCategory({ onPrevious, onNext, matchMainCategory }) {
  const [mainCategory, setMainCategory] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState({
    '동네 동행': false,
    '멀리 동행': false,
    집안일: false,
    배달: false,
    목욕: false,
    '반려 동물': false,
    교육: false,
    기타: false,
  });

  console.log(mainCategory);

  useEffect(() => {
    if (matchMainCategory) {
      setIsOptionSelected({ ...isOptionSelected, matchMainCategory: true });
      setMainCategory(matchMainCategory);
    }
  }, [matchMainCategory]);

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
        onNext={() => onNext(mainCategory)}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="어떤 일" normalContent="을"></BoldText>,
          '맡기고 싶으신가요?',
        ]}
      ></Paragraph>

      <ProgressBar value={17}></ProgressBar>

      <ContentBox>
        <Button
          mode={isOptionSelected['동네 동행'] ? 'SMALL' : 'SMALL_WHITE'}
          msg={'동네 동행'}
          onClick={() => {
            setMainCategory('동네 동행');
            setIsOptionSelected({ ...isOptionSelected, '동네 동행': true });
          }}
        ></Button>
        <Button
          mode={'SMALL_WHITE'}
          msg={'멀리 동행'}
          onClick={() => setMainCategory('멀리 동행')}
        ></Button>
      </ContentBox>
      <ContentBox>
        <Button
          mode={'SMALL_WHITE'}
          msg={'집안일'}
          onClick={() => setMainCategory('집안일')}
        ></Button>
        <Button
          mode={'SMALL_WHITE'}
          msg={'배달'}
          onClick={() => setMainCategory('배달')}
        ></Button>
      </ContentBox>
      <ContentBox>
        <Button
          mode={'SMALL_WHITE'}
          msg={'목욕'}
          onClick={() => setMainCategory('목욕')}
        ></Button>
        <Button
          mode={'SMALL_WHITE'}
          msg={'반려 동물'}
          onClick={() => setMainCategory('반려 동물')}
        ></Button>
      </ContentBox>
      <ContentBox>
        <Button
          mode={'SMALL_WHITE'}
          msg={'교육'}
          onClick={() => setMainCategory('교육')}
        ></Button>
        <Button
          mode={'SMALL_WHITE'}
          msg={'기타'}
          onClick={() => setMainCategory('기타')}
        ></Button>
      </ContentBox>
    </Wrapper>
  );
}

export default MainCategory;

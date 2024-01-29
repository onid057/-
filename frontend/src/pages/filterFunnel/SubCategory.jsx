import { useState } from 'react';
import { styled } from 'styled-components';

import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
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

// 앞에서 대분류 선택에 따라서 여기 subCategoryList가 달라져야 하는데 어떻게 하는지 잘 모르겠음...
function SubCategory({ onPrevious, onNext, matchSubCategory }) {
  const [subCategory, setSubCategory] = useState(matchSubCategory);

  const subCategoryList = [
    '행정복지센터 가기',
    '밥먹기',
    '장보기',
    '동네 병원 가기',
    '은행가기',
    '상관 없음',
  ];

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
        onNext={() => onNext(subCategory)}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="자세한 일" normalContent="을"></BoldText>,
          '정해주세요',
        ]}
      ></Paragraph>

      {/* ProgressBar 진척도 변경 부분 */}
      <ProgressBar value={34}></ProgressBar>

      {subCategoryList.map((category, index) => {
        return (
          <Button
            key={index}
            mode={subCategory === category ? 'THIN_BLUE' : 'THIN_WHITE'}
            msg={category}
            onClick={() => setSubCategory(category)}
          ></Button>
        );
      })}
    </Wrapper>
  );
}

export default SubCategory;

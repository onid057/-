import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAsZipsa } from '../../apis/api/userMyPage';
import CATEGORY_ID from '../../constants/categoryId';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import Image from '../../components/common/Image';
import LongInputBox from '../../components/common/LongInputBox';
import ZipsaTagUpdate from '../../components/zipsamypage/ZipsaTagUpdate';
import Button from '../../components/common/Button';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0px 16px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
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

const categoryList = [
  '동네 동행',
  '멀리 동행',
  '집안일',
  '배달',
  '목욕',
  '반려 동물',
  '교육',
  '기타',
];

function InsertZipsaInfo() {
  const navigate = useNavigate();
  const [preferTags, setPreferTags] = useState(
    '산책하기#함께 장보기#병원 가기#자차 보유#요양보호사'.split('#'),
  );
  const [mainCategory, setMainCategory] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [detail, setDetail] = useState();

  const calculateIndex = inputArray => {
    const temp = [];
    inputArray.forEach((element, index) => {
      if (element) temp.push(CATEGORY_ID[categoryList[index]][0]);
    });
    return temp;
  };

  return (
    <Wrapper>
      <NavigationBar
        leftContent={
          <Image
            src={`${process.env.PUBLIC_URL}/images/keyboard_arrow_left.svg`}
            width={'40px'}
            height={'40px'}
            margin={'0 0 0 -12px'}
          ></Image>
        }
        rightContent={'집사 신청'}
        onPrevious={() => navigate(-1)}
        onNext={async () => {
          await registerAsZipsa(
            detail,
            '1111111111111111',
            preferTags.join('#'),
            calculateIndex(mainCategory),
          );
          navigate('/myPage');
        }}
        disabledOnNext={!detail || calculateIndex(mainCategory).length < 1}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent={'집사'} normalContent={' 정보'}></BoldText>,
          '입력하기',
        ]}
        margin={'0 0 20px 0'}
      ></Paragraph>

      <LongInputBox
        title={'자기소개'}
        placeholder={
          '저는 OO시 OO동에 사는 청년입니다! 간단하게 도울 일이 있다면 언제든지 달려가겠습니다!!!'
        }
        onChange={event => setDetail(event.target.value)}
      ></LongInputBox>

      <>5개까지 골라주세요!</>

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
              mode={mainCategory[index] ? 'THICK_BLUE' : 'THICK_WHITE'}
              onClick={() => {
                const newArray = [...mainCategory];
                if (newArray.filter(element => !!element).length === 5) {
                  if (newArray[index]) newArray[index] = false;
                } else if (newArray.filter(element => !!element).length < 5) {
                  newArray[index] = !newArray[index];
                }
                setMainCategory(newArray);
              }}
            >
              {category}
            </Button>
          );
        })}
      </ContentBox>

      <ZipsaTagUpdate
        preferTags={preferTags}
        setPreferTags={setPreferTags}
      ></ZipsaTagUpdate>
    </Wrapper>
  );
}

export default InsertZipsaInfo;

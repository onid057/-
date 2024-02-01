import styled from 'styled-components';
import Button from '../components/common/Button'; // Button 리팩토링 완료
import HorizontalLine from '../components/common/HorizontalLine'; // HorizontalLine 리팩토링 완료
import Image from '../components/common/Image'; // Image 리팩토링 완료
import Paragraph from '../components/common/Paragraph'; // Paragraph 리팩토링 완료, textAlign prop 추가
import ProgressBar from '../components/common/ProgressBar'; // ProgressBar 수정할 내용 없음
import BoldText from '../components/common/BoldText'; // BoldText 수정할 내용 없음
import NavigateText from '../components/common/NavigateText'; // NavigateText 수정할 내용 없음
import MenuBar from '../components/common/MenuBar'; // MenuBar 추후 수정 필요함 -> 컴포넌트가 가장 하단에 위치해야 하는 문제 발생
import Notice from '../components/common/Notice'; // Notice 클릭 여부에 따라 배경색 조정 중
const Wrapper = styled.div`
  position: relative;
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

function ExperimentCommonComponent() {
  return (
    <Wrapper>
      Button.jsx
      <ButtonWrapper>
        <Button mode="THICK_GRAY">안녕</Button>
        <Button mode="THICK_GRAY">안녕</Button>
      </ButtonWrapper>
      <Button mode="THICK_GRAY">안녕</Button>
      <Button mode="THIN_GRAY">안녕</Button>
      <ButtonWrapper>
        <Button mode="THICK_BLUE">안녕</Button>
        <Button mode="THICK_BLUE">안녕</Button>
      </ButtonWrapper>
      <Button mode="THICK_BLUE">안녕</Button>
      <Button mode="THIN_BLUE">안녕</Button>
      <ButtonWrapper>
        <Button mode="THICK_WHITE">안녕</Button>
        <Button mode="THICK_WHITE">안녕</Button>
      </ButtonWrapper>
      <Button mode="THICK_WHITE">안녕</Button>
      <Button mode="THIN_WHITE">안녕</Button>
      <Button mode="IMAGE_UPLOAD">이미지 첨부하기</Button>
      <Button mode="IMAGE_EDIT">이미지 수정하기</Button>
      <Button mode="DIAMOND_WHITE">1 이상</Button>
      <Button mode="DIAMOND_BLUE">2 이상</Button>
      <HorizontalLine
        height="1.5px"
        marginTop="5px"
        marginBottom="7px"
        color="red"
      ></HorizontalLine>
      Image.jsx
      <Image
        src={`${process.env.PUBLIC_URL}/images/map.svg`}
        width="150px"
        height="100px"
        onDelete={() => console.log('hi')}
      />
      <Image
        src={`${process.env.PUBLIC_URL}/images/small_dia.svg`}
        width="150px"
        height="100px"
        onDelete={() => console.log('hi')}
      />
      <Image
        src={`${process.env.PUBLIC_URL}/images/small_dia.svg`}
        width="150px"
        height="100px"
      />
      <HorizontalLine
        height="1.5px"
        marginTop="5px"
        marginBottom="7px"
        color="red"
      ></HorizontalLine>
      {/* textAlign 옵션에는 start, center, end */}
      Paragraph.jsx
      <Paragraph
        gap="5px"
        fontSize="30px"
        sentences={['장수민', '리팩토링중']}
        textAlign={'center'}
      ></Paragraph>
      <HorizontalLine
        height="1.5px"
        marginTop="5px"
        marginBottom="7px"
        color="red"
      ></HorizontalLine>
      ProgressBar.jsx
      <ProgressBar value={22}></ProgressBar>
      <HorizontalLine
        height="1.5px"
        marginTop="5px"
        marginBottom="7px"
        color="red"
      ></HorizontalLine>
      BoldText.jsx
      <BoldText
        fontSize={'30px'}
        boldContent={'장수민'}
        normalContent={' 리팩토링 중'}
      ></BoldText>
      Paragraph와 BoldText의 조합 예시
      <Paragraph
        gap="5px"
        fontSize="30px"
        sentences={[
          <BoldText
            fontSize={'30px'}
            boldContent={'장수민'}
            normalContent={'은'}
          ></BoldText>,
          '리팩토링중',
        ]}
      ></Paragraph>
      <HorizontalLine
        height="1.5px"
        marginTop="5px"
        marginBottom="7px"
        color="red"
      ></HorizontalLine>
      NavigateText.jsx
      <NavigateText nextPage={'/ooooooo'}>
        이거 누르면 not found page 간다
      </NavigateText>
      <HorizontalLine
        height="1.5px"
        marginTop="5px"
        marginBottom="7px"
        color="red"
      ></HorizontalLine>
      <Notice
        upper={[
          <Image
            src={process.env.PUBLIC_URL + '/images/light.svg'}
            width="40px"
            height="40px"
          ></Image>,
          <BoldText
            fontSize="20px"
            boldContent="{ 곽희웅 }"
            normalContent=" 고객님이"
          ></BoldText>,
        ]}
        lower={[
          <Paragraph
            gap="5px"
            fontSize="18px"
            sentences={[
              <BoldText
                boldContent="[ 강아지 산책 ]"
                normalContent=" 을"
              ></BoldText>,
              '요청하셨어요!',
            ]}
          ></Paragraph>,
        ]}
        disabled={true}
      ></Notice>
      <MenuBar currentMenu={'SEARCH'}></MenuBar>
    </Wrapper>
  );
}

export default ExperimentCommonComponent;

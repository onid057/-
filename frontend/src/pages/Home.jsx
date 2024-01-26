import { styled } from 'styled-components';

import Image from '../components/common/Image.jsx';
import Paragraph from '../components/common/Paragraph.jsx';
import Notice from '../components/common/Notice.jsx';
import BoldText from '../components/common/BoldText.jsx';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 30px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

export default function Home() {
  return (
    <Wrapper>
      <Notice
        upper={[
          <Image
            src={process.env.PUBLIC_URL + '/images/lightning.svg'}
            width="40px"
            height="40px"
            margin="0"
          ></Image>,
          <BoldText
            fontSize="20px"
            boldContent="{ 곽희웅 }"
            normalContent=" 고객님"
          ></BoldText>,
        ]}
        lower={[
          <Paragraph
            fontSize="16px"
            gap="5px"
            sentences={[
              <BoldText
                boldContent="오늘 15:00"
                normalContent=" 시에"
              ></BoldText>,
              <BoldText
                boldContent="[ 강아지 산책 ]"
                normalContent=" 을 맡겼어요!"
              ></BoldText>,
            ]}
          ></Paragraph>,
        ]}
        nextPage="/"
      ></Notice>

      <Notice
        upper={[
          <Image
            src={process.env.PUBLIC_URL + '/images/location.svg'}
            width="40px"
            height="40px"
            margin="0"
          ></Image>,
          <Paragraph
            fontSize="16px"
            gap="3px"
            sentences={[
              <BoldText
                boldContent="14"
                normalContent=" 명의 집사가"
              ></BoldText>,
              '주변에 기다리고 있어요',
            ]}
          ></Paragraph>,
        ]}
        lower={[<img src={process.env.PUBLIC_URL + '/images/map.svg'}></img>]}
        padding="20px 12px"
        nextPage="/"
      ></Notice>

      <Notice
        upper={[
          <Image
            src={process.env.PUBLIC_URL + '/images/light.svg'}
            width="40px"
            height="40px"
            margin="0"
          ></Image>,
          <Paragraph
            fontSize="16px"
            gap="3px"
            sentences={['좀 더 꼼꼼하게', '집사님을 찾고 있어요']}
          ></Paragraph>,
        ]}
        padding="20px 12px"
        nextPage="/filterOption"
      ></Notice>

      {/*
			<InLineBox gap="10px">
				<SmallNoticeWrapper>
					<ImageBox src="./images/comment.svg"></ImageBox>
					<h1>
						다른 사용자와 {'\n'}
						소통하고 싶어요
					</h1>
				</SmallNoticeWrapper>

				<SmallNoticeWrapper>
					<ImageBox src="./images/paper.svg"></ImageBox>
					<h1>
						후기를 {'\n'}
						남기고 싶어요
					</h1>
				</SmallNoticeWrapper>
			</InLineBox> */}
    </Wrapper>
  );
}

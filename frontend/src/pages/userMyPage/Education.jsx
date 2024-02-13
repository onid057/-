import React, { useState } from 'react';
import styled from 'styled-components';
import Paragraph from '../../components/common/Paragraph';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import HorizontalLine from '../../components/common/HorizontalLine';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { applyZipsaRequest } from '../../apis/api/userMyPage';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const TitleWrapper = styled.div`
  width: 100%;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ContentWrapper = styled.div`
  width: 288px;
  padding: 20px 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 25px;
  gap: 15px;
`;

const TextWrapper = styled.div`
  font-size: 18px;
  line-height: 1.3;
`;

function Education() {
  const educationInfo = [
    {
      name: '유의사항',
      content: [
        '심부름 지원 시 요청 내용과 시간, 장소 등을 꼼꼼히 확인한 후 지원해 주세요.',
        '고객과 매칭이 되면 취소가 불가능해요.',
      ],
    },
    {
      name: '고객응대',
      content: [
        '항상 단정한 용모와 깨끗한 복장을 유지해 주세요.',
        '항상 웃는 얼굴로 고객을 맞이하고 먼저 밝게 인사해 주세요.',
      ],
    },
  ];

  const promiseInfo = [
    '고객에게 서비스에 대한 책임감을 보여준다.',
    '고객의 모든 정보는 개인적으로 이용이 불가능한 것을 유의하고, 고객 정보 보안에 주의한다.',
    '항상 단정한 용모와 깨끗한 복장을 유지한다.',
  ];

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let date = today.getDate();

  const [sign, setSign] = useState('');
  const onSignChange = e => setSign(e.target.value);

  const onButtonClick = () => {
    // // 서명이 실명과 일치하지 않는다면
    // if (userName !== sign) {
    //   alert('본인의 실명을 입력해주세요.');
    // } else {
    //   // axios 요청 보내기
    // }
    applyZipsaRequest(userId);
  };
  const navigate = useNavigate();
  const onPrevious = () => {
    navigate(-1);
  };

  const userId = 1;

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
        onPrevious={onPrevious}
      ></NavigationBar>
      <TitleWrapper>
        <Paragraph
          gap={'10px'}
          fontSize={'35px'}
          sentences={['필수교육을', '꼼꼼히', '읽어주세요']}
        ></Paragraph>
      </TitleWrapper>
      {educationInfo.map((info, idx) => (
        <BodyWrapper key={idx}>
          <BoldText fontSize={'25px'} normalContent={info.name}></BoldText>
          <ContentWrapper>
            {info.content.map((content, idx) => (
              <TextWrapper key={idx}>{`${idx + 1}. ` + content}</TextWrapper>
            ))}
          </ContentWrapper>
        </BodyWrapper>
      ))}
      <HorizontalLine height={'7px'} color={'#D9D9D9'}></HorizontalLine>
      <TitleWrapper>
        <Paragraph fontSize={'35px'} sentences={['서비스 서약서']}></Paragraph>
      </TitleWrapper>
      <ContentWrapper>
        <TextWrapper>
          한집사 서비스 제공과 관련하여 아래사항을 서약합니다.
        </TextWrapper>
        {promiseInfo.map((info, idx) => (
          <TextWrapper key={idx}>{`${idx + 1}. ` + info}</TextWrapper>
        ))}
        <Paragraph
          fontSize={'20px'}
          sentences={[`${year}.${month}.${date}`]}
          textAlign={'center'}
        ></Paragraph>
      </ContentWrapper>
      <Input
        width={'100%'}
        labelText={'서명'}
        type={'text'}
        placeholder={'본인의 실명을 입력해주세요.'}
        value={sign}
        onChange={onSignChange}
      ></Input>
      <Button
        mode={'THICK_BLUE'}
        children={'동의하기'}
        onClick={onButtonClick}
      ></Button>
    </Wrapper>
  );
}

export default Education;

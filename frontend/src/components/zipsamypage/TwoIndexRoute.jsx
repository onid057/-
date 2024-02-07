import styled from 'styled-components';
import Image from '../common/Image';
import Paragraph from '../common/Paragraph';
import BoldText from '../common/BoldText';

const ContentBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 334px;
  padding: 10px 10px 20px;
  position: absolute;
  top: 41px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  font-weight: 400;
  font-size: 16px;
  background-color: #ffffff;
  border-radius: 25px;
`;

const LinkText = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 12px;
  font-weight: 300;
  > span {
    cursor: pointer;
  }
`;

const NameBox = styled.div`
  box-sizing: border-box;
  width: 80%;
  height: auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  background-color: ${props =>
    props.$backgroundcolor ? props.$backgroundcolor : '#e3fee8'};
  border-radius: 25px;
`;

function TwoIndexRoute({ index, name, gradeId, gradeName, avgScore }) {
  //   const navigate = useNavigate();

  //   const handleClick = () => {
  //     navigate(nextPage);
  //   };

  let nameBoxColor;
  if (gradeId === 1) {
    nameBoxColor = '#E3FEE8';
  } else if (gradeId === 2) {
    nameBoxColor = '#64FFDF';
  } else if (gradeId === 3) {
    nameBoxColor = '#66DAFF';
  } else if (gradeId === 4) {
    nameBoxColor = '#7FB5FF';
  } else if (gradeId === 5) {
    nameBoxColor = '#EBA8FF';
  }

  if (index === 'GRADE') {
    return (
      <ContentBox>
        <LinkText>
          {/* 누르면 ZipsaDetail 페이지로 이동 */}
          <span>상세정보 확인하기</span>
          <Image
            src={`${process.env.PUBLIC_URL}/images/right_arrow_no_tail.svg`}
            width={'7px'}
            height={'10px'}
            margin={'5px'}
          ></Image>
        </LinkText>

        <Image
          src={`${process.env.PUBLIC_URL}/images/room_${gradeId}.svg`}
          width={'169px'}
          height={'168px'}
        ></Image>
        <NameBox $backgroundcolor={nameBoxColor}>
          <Paragraph
            gap={'5px'}
            fontSize={'20px'}
            sentences={[
              `${name} 집사님은`,
              <BoldText
                fontSize={'20px'}
                // 가운데 정렬이 안돼서 앞에 한 칸씩 띄워줬어요
                boldContent={` ${gradeName} 집사`}
                normalContent={' 예요'}
              ></BoldText>,
            ]}
          ></Paragraph>
        </NameBox>
      </ContentBox>
    );
  } else if (index === 'DIA') {
    return (
      <ContentBox>
        <LinkText>
          {/* 누르면 상세정보 페이지로 이동 */}
          <span>상세정보 확인하기</span>
          <Image
            src={`${process.env.PUBLIC_URL}/images/right_arrow_no_tail.svg`}
            width={'7px'}
            height={'10px'}
            margin={'5px'}
          ></Image>
        </LinkText>
        <Image
          src={`${process.env.PUBLIC_URL}/images/dia_5.svg`}
          width={'245px'}
          height={'47px'}
        ></Image>
        <NameBox $backgroundcolor={'#DCF0F5'}>
          <Paragraph
            gap={'5px'}
            fontSize={'20px'}
            sentences={[
              '나의 다이아 점수는',
              <BoldText
                fontSize={'20px'}
                // 가운데 정렬이 안돼서 앞에 한 칸씩 띄워줬어요
                boldContent={`    ${avgScore} 점`}
                normalContent={' 이예요'}
              ></BoldText>,
            ]}
          ></Paragraph>
        </NameBox>
      </ContentBox>
    );
  }
}

export default TwoIndexRoute;

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationBar from '../../components/common/NavigationBar';
import TwoIndex from '../../components/zipsamypage/TwoIndex';
import Notice from '../../components/common/Notice';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import Image from '../../components/common/Image';
import { getSimpleZipsaInfo } from '../../apis/api/zipsaMyPage';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const MenuText = styled.div`
  width: ${props => props.width || '200px'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function ZipsaMyPageMain() {
  // NavigationBar 사용 위한 변수 선언
  const navigate = useNavigate();
  const onPrevious = () => {
    navigate(-1);
  };

  // helperId 조회 ★★★★★★★ helperId ★★★★★★★★
  const helperId = 3;

  // (간단) 집사 정보조회 API 호출
  const [data, setData] = useState({});
  const [gradeName, setGradeName] = useState();

  useEffect(() => {
    getSimpleZipsaInfo(helperId).then(response => {
      console.log('집사 간단 정보 조회 성공');
      setData(response.data);
    });
  }, []);

  // 집사 명칭 영 → 한 변환
  const nameChanger = () => {
    switch (data.gradeName) {
      case 'APPRENTICE':
        setGradeName('견습');
      case 'NOVICE':
        setGradeName('초보');
      case 'ADVANCED':
        setGradeName('숙련');
      case 'PROFESSIONAL':
        setGradeName('프로');
      case 'LEGEND':
        setGradeName('전설');
      default:
        setGradeName('견습');
    }
  };

  useEffect(() => {
    nameChanger();
  }, [data]);

  // 내 정보 수정페이지로 이동

  const MenuList = ['활동 내역 보기', '정산하기', '작성한 게시물 확인하기'];
  const number =
    (data.kindnessAverage + data.skillAverage + data.rewindAverage) / 3;
  const avgScore = number.toFixed(2);

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

      <Notice
        upper={[
          <Image
            src={`${process.env.PUBLIC_URL}/images/profile_img.svg`}
            width={'60px'}
            height={'60px'}
            margin={'0px'}
          ></Image>,
          <Paragraph
            gap={'10px'}
            fontSize={'13px'}
            sentences={[
              <BoldText
                fontSize={'20px'}
                boldContent={data.name}
                normalContent={' 집사님'}
              ></BoldText>,
              '내 정보 수정하기',
            ]}
          ></Paragraph>,
        ]}
        lower={null}
        padding={'15px 13px'}
      ></Notice>

      <TwoIndex
        helperId={helperId}
        name={data.name}
        gradeId={data.gradeId}
        gradeName={gradeName}
        avgScore={avgScore}
      ></TwoIndex>

      {MenuList.map((content, idx) => (
        <Notice
          key={idx}
          upper={[
            <MenuText width="270px">
              <BoldText
                fontSize={'18px'}
                boldContent={null}
                normalContent={content}
              ></BoldText>
              <Image
                src={process.env.PUBLIC_URL + '/images/right_arrow.svg'}
                width={'24px'}
                height={'24px'}
                margin={'0'}
              ></Image>
            </MenuText>,
          ]}
          lower={null}
          // 각자 페이지로 이동하기
          nextPage={''}
          padding={'20px 12px'}
        ></Notice>
      ))}
    </Wrapper>
  );
}

export default ZipsaMyPageMain;

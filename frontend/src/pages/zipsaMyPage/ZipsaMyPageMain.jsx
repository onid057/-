import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSimpleZipsaInfo } from '../../apis/api/zipsaMyPage';
import styled from 'styled-components';
import MenuBar from '../../components/common/MenuBar';
import TwoIndex from '../../components/zipsamypage/TwoIndex';
import Notice from '../../components/common/Notice';
import Paragraph from '../../components/common/Paragraph';
import BoldText from '../../components/common/BoldText';
import Image from '../../components/common/Image';
import NavigateButton from '../../components/common/NavigateButton';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 10px 16px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 300;
  white-space: pre-wrap;
`;

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
`;

const HeadWrapper = styled.div`
  width: 100%;
  min-height: 509px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  font-weight: 300;
  white-space: pre-wrap;
`;

function ZipsaMyPageMain() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [gradeName, setGradeName] = useState();

  useEffect(() => {
    getSimpleZipsaInfo(0).then(response => {
      setData(response.data);
    });
  }, []);

  // 다이아 점수 계산
  const number =
    (data.kindnessAverage + data.skillAverage + data.rewindAverage) / 3;
  const avgScore = number.toFixed(2);

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

  return (
    <Wrapper>
      <HeadWrapper>
        <Notice
          upper={[
            <ImageWrapper>
              <Image
                src={
                  data.profileImage ||
                  `${process.env.PUBLIC_URL}/images/profile_img.svg`
                }
                width={'60px'}
                height={'60px'}
                margin={'0px'}
              ></Image>
            </ImageWrapper>,
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
          nextPage={'/zipsa/update'}
        ></Notice>

        <TwoIndex
          helperId={0}
          name={data.name}
          gradeId={data.gradeId}
          gradeName={gradeName}
          avgScore={avgScore}
        ></TwoIndex>

        <NavigateButton onClick={() => navigate('/zipsa/history')}>
          활동 내역 보기
        </NavigateButton>
      </HeadWrapper>
      <MenuBar currentMenu="USER" isWorked={true}></MenuBar>
    </Wrapper>
  );
}

export default ZipsaMyPageMain;

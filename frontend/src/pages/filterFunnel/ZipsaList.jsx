import { useState } from 'react';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import ProgressBar from '../../components/common/ProgressBar';
import FilteredZipsaInfo from '../../components/filter/FilteredZipsaInfo';

const Wrapper = styled.div`
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

function ZipsaList({ onPrevious, onNext, zipsaData, savedZipsaId }) {
  const [selectedZipsaId, setSelectedZipsaId] = useState(savedZipsaId || []);

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
        rightContent={`${selectedZipsaId.length}명 선택`}
        onPrevious={onPrevious}
        onNext={() => onNext(selectedZipsaId)}
        disabledOnNext={!selectedZipsaId.length}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="35px"
        sentences={[
          <BoldText boldContent="최대 5명" normalContent="의"></BoldText>,
          '집사님을',
          '선택해 주세요',
        ]}
      ></Paragraph>

      <ProgressBar value={44}></ProgressBar>

      {zipsaData.length > 0 &&
        zipsaData.map((zipsa, index) => {
          return (
            <FilteredZipsaInfo
              key={index}
              zipsaId={zipsa.zipsaId}
              profileImage={zipsa.profileImage}
              name={zipsa.name}
              gradeName={zipsa.gradeName}
              scoreAverage={zipsa.scoreAverage}
              serviceCount={zipsa.serviceCount}
              preferTag={zipsa.preferTag}
              onClick={() =>
                selectedZipsaId.includes(zipsa.zipsaId)
                  ? setSelectedZipsaId(
                      [...selectedZipsaId].filter(Id => Id !== zipsa.zipsaId),
                    )
                  : setSelectedZipsaId([...selectedZipsaId, zipsa.zipsaId])
              }
              isSelected={selectedZipsaId.includes(zipsa.zipsaId)}
            ></FilteredZipsaInfo>
          );
        })}
    </Wrapper>
  );
}

export default ZipsaList;

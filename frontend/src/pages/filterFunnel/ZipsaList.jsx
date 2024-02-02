import { useState } from 'react';

import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import ProgressBar from '../../components/common/ProgressBar';
import FilteredHelperInfo from '../../components/filter/FilteredHelperInfo';

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

function ZipsaList({ onPrevious, onNext, helperData, savedHelperId }) {
  const [selectedHelperId, setSelectedHelperId] = useState(savedHelperId || []);

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
        rightContent={`${selectedHelperId.length}명 선택`}
        onPrevious={onPrevious}
        onNext={() => onNext(selectedHelperId)}
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

      {helperData.length > 0 &&
        helperData.map((helper, index) => {
          return (
            <FilteredHelperInfo
              key={index}
              zipsaId={helper.zipsaId}
              profileImage={helper.profileImage}
              name={helper.name}
              gradeName={helper.gradeName}
              scoreAverage={helper.scoreAverage}
              serviceCount={helper.serviceCount}
              categories={helper.categories}
              onClick={() =>
                selectedHelperId.includes(helper.zipsaId)
                  ? setSelectedHelperId(
                      [...selectedHelperId].filter(Id => Id !== helper.zipsaId),
                    )
                  : setSelectedHelperId([...selectedHelperId, helper.zipsaId])
              }
              isSelected={selectedHelperId.includes(helper.zipsaId)}
            ></FilteredHelperInfo>
          );
        })}

      {/* <FilteredHelperInfo
        zipsaId={3}
        onClick={() =>
          selectedHelperId.includes(3)
            ? setSelectedHelperId([...selectedHelperId].filter(Id => Id !== 3))
            : setSelectedHelperId([...selectedHelperId, 3])
        }
        isSelected={selectedHelperId.includes(3)}
      ></FilteredHelperInfo>
      <FilteredHelperInfo
        zipsaId={4}
        onClick={() =>
          selectedHelperId.includes(4)
            ? setSelectedHelperId([...selectedHelperId].filter(Id => Id !== 4))
            : setSelectedHelperId([...selectedHelperId, 4])
        }
        isSelected={selectedHelperId.includes(4)}
      ></FilteredHelperInfo>
      <FilteredHelperInfo
        zipsaId={5}
        onClick={() =>
          selectedHelperId.includes(5)
            ? setSelectedHelperId([...selectedHelperId].filter(Id => Id !== 5))
            : setSelectedHelperId([...selectedHelperId, 5])
        }
        isSelected={selectedHelperId.includes(5)}
      ></FilteredHelperInfo> */}

      {/* <ButtonBox>
        <Button
          mode={'NORMAL_BLUE'}
          color={'#629af9'}
          msg={'2/5명에게 요청 보내기'}
        ></Button>
      </ButtonBox> */}
    </Wrapper>
  );
}

export default ZipsaList;

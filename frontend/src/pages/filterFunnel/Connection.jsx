import { useState, useEffect } from 'react';
import { getAssociatedUserList } from '../../apis/api/associate';
import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoldText from '../../components/common/BoldText';
import Paragraph from '../../components/common/Paragraph';
import ProgressBar from '../../components/common/ProgressBar';

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
const UserWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  background-color: #ffffff;
  border-radius: 25px;
  font-weight: 400;
  box-shadow: ${props =>
    props.$isSelected ? '0 0 0 1px #629af9 inset' : 'none'};
`;
const TextWrapper = styled.div`
  margin: 0 auto;
  color: #d9d9d9;
`;

function Connection({ onPrevious, onNext, matchUserId }) {
  const [associatedUserList, setAssociatedUserList] = useState();
  const [userId, setUserId] = useState(matchUserId);
  useEffect(() => {
    getAssociatedUserList().then(response => {
      if (response.length) setAssociatedUserList(response);
      else setUserId(-1);
    });
  }, []);

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
        onNext={() => onNext(userId === -1 ? null : userId)}
        disabledOnNext={!userId}
      ></NavigationBar>

      <Paragraph
        gap="5px"
        fontSize="30px"
        sentences={[
          <BoldText boldContent="어떤 사람" normalContent="이"></BoldText>,
          '서비스를 받나요?',
        ]}
      ></Paragraph>

      <ProgressBar value={89}></ProgressBar>

      {!associatedUserList ? (
        <TextWrapper>연동된 멤버가 없습니다.</TextWrapper>
      ) : (
        associatedUserList?.map((user, index) => {
          return (
            <UserWrapper
              key={index}
              onClick={() => {
                if (user.isRepresentative) {
                  if (userId === -1) setUserId(null);
                  else setUserId(-1);
                } else {
                  if (userId === user.id) setUserId(null);
                  else setUserId(user.id);
                }
              }}
              $isSelected={
                user.isRepresentative
                  ? userId === -1 && true
                  : userId === user.id
              }
            >
              <Image
                src={
                  user.profileImage ||
                  `${process.env.PUBLIC_URL}/images/profile_img.svg`
                }
                width={'69px'}
                height={'69px'}
              ></Image>
              {user.isRepresentative
                ? `${user.name} (${'나, 대표'})`
                : `${user.name} (멤버)`}
            </UserWrapper>
          );
        })
      )}
    </Wrapper>
  );
}

export default Connection;

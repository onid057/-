import styled from 'styled-components';
import NavigationBar from './NavigationBar';
import Image from './Image';
import UpdateDeleteButton from './UpdateDeleteButton';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 0px 20px 0px 0px;
  display: flex;
`;

const LeftBox = styled.div`
  width: 100%;
  height: 100%;
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const RightBox = styled.div`
  width: 100%;
  height: 100%;
  flex: 7;
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 14px;
  font-weight: normal;
`;

const Name = styled.div`
  font-weight: 600;
`;

const Address = styled.div``;

const Content = styled.div`
  margin: 3px 0px;
  font-size: 14px;
  font-weight: 350;
`;

const Date = styled.div`
  font-size: 14px;
  font-weight: 200;
`;

function BoardComment({
  image,
  userName,
  address,
  content,
  updatedAt,
  updateButton,
  deleteButton,
}) {
  return (
    <Wrapper>
      <LeftBox>
        <Image
          src={`${process.env.PUBLIC_URL}/images/profile_img.svg`}
          width={'50px'}
          height={'50px'}
          margin={'0 0 0 -12px'}
        ></Image>
      </LeftBox>

      <RightBox>
        <Name>{userName}</Name>
        <Address>{address}</Address>
        <Content>{content}</Content>
        <Date>{updatedAt}</Date>

        {/* 수정, 삭제 버튼 넣을 곳 */}
        <UpdateDeleteButton
          updateButton={updateButton}
          deleteButton={deleteButton}
        ></UpdateDeleteButton>
      </RightBox>
    </Wrapper>
  );
}

export default BoardComment;

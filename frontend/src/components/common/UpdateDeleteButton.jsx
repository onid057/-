import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 3px 0px;
  display: flex;
  justify-content: start;
  gap: 8px;
  font-size: 14px;
  font-weight: 300;
`;

const UpdateButton = styled.button`
  cursor: pointer;
  width: 51px;
  height: 23px;
  border-radius: 5px;
  background-color: #7d7d7d;
  color: white;
`;

const DeleteButton = styled.button`
  cursor: pointer;
  width: 51px;
  height: 23px;
  border-radius: 5px;
  background-color: #7d7d7d;
  color: white;
`;

function UpdateDeleteButton({
  needUpdateButton,
  needDeleteButton,
  updateOnClick,
  deleteOnClick,
}) {
  return (
    <Wrapper>
      {needUpdateButton && (
        <UpdateButton onClick={updateOnClick}>수정</UpdateButton>
      )}
      {needDeleteButton && (
        <DeleteButton onClick={deleteOnClick}>삭제</DeleteButton>
      )}
    </Wrapper>
  );
}

export default UpdateDeleteButton;

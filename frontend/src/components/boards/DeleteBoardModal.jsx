import styled from 'styled-components';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { deleteOneArticle } from '../../apis/api/board';
import ModalContainer from '../common/ModalContainer';

const Wrapper = styled.div`
  width: 300px;
  height: auto;
  padding: 30px 16px 25px;
  position: relative;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  box-shadow: 0px 5px 15px 1px lightgray;
  background-color: white;
  border-radius: 25px;
  white-space: pre-wrap;
`;

const TitleText = styled.div`
  text-align: center;
  font-size: 17px;
  font-weight: 500;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  gap: 15px;
`;

function DeleteBoardModal({ boardId, onClick }) {
  // 게시글 삭제 API 호출
  const navigate = useNavigate();
  const deleteThisArticle = () => {
    deleteOneArticle(boardId);
    // window.location.replace(`/boards`);
    navigate(`/boards/`);
    window.location.reload();
    console.log('게시글 삭제 성공');
  };

  return (
    <ModalContainer>
      <Wrapper>
        <TitleText>이 게시글을 정말로 삭제할까요?</TitleText>
        <ButtonWrapper>
          <Button
            onClick={onClick}
            mode={'THIN_GRAY'}
            children={'취소'}
          ></Button>
          <Button
            onClick={() => deleteThisArticle(boardId)}
            mode={'THIN_BLUE'}
            children={'삭제'}
          ></Button>
        </ButtonWrapper>
      </Wrapper>
    </ModalContainer>
  );
}

export default DeleteBoardModal;

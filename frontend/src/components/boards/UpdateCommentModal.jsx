import styled from 'styled-components';
import Button from '../common/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { updateOneComment } from '../../apis/api/board';
import ModalContainer from '../common/ModalContainer';
import { useState } from 'react';

const Wrapper = styled.div`
  width: 300px;
  height: auto;
  padding: 30px 16px 25px;
  position: relative;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  box-shadow: 0px 5px 15px 1px lightgray;
  background-color: #ffffff;
  border-radius: 25px;
  white-space: pre-wrap;
`;

const TextareaWrapper = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 8px;
  font-size: 16px;
  color: black;
  line-height: 22px;
  /* background-color: #ecf4fa; */
  &::placeholder {
    color: darkgray;
    line-height: 22px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  gap: 15px;
`;

function UpdateCommentModal({ boardId, defaultValue, commentId, onClick }) {
  // 댓글 수정 API 호출
  const navigate = useNavigate();
  const toUpdateOneComment = (commentId, content) => {
    updateOneComment(commentId, content);
    navigate(`/boards/${boardId}`);
  };

  // 댓글 수정 내용 받을 변수 선언하기
  const [newContent, setNewContent] = useState(defaultValue);

  return (
    <ModalContainer>
      <Wrapper>
        <TextareaWrapper
          // placeholder="동해물과백둫산이마르고닳도록하느님이보우하사우리나라만세무궁화삼천리화려강산"
          defaultValue={defaultValue}
          onChange={e => setNewContent(e.target.value)}
        ></TextareaWrapper>
        <ButtonWrapper>
          <Button
            onClick={onClick}
            mode={'THIN_GRAY'}
            children={'취소'}
          ></Button>
          <Button
            onClick={() => toUpdateOneComment(commentId, newContent)}
            mode={'THIN_BLUE'}
            children={'수정'}
          ></Button>
        </ButtonWrapper>
      </Wrapper>
    </ModalContainer>
  );
}

export default UpdateCommentModal;

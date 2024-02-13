import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getOneArticle, createComment } from '../../apis/api/board';
import styled from 'styled-components';
import Image from '../../components/common/Image';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputBox = styled.div`
  box-sizing: border-box;
  width: 87%;
  height: auto;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 25px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 41px;
  display: flex;
  font-size: 16px;
  font-weight: 300;
  color: black;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 16px;
    font-weight: 300;
    color: #6b6b6b;
  }
`;

const SubmitImg = styled.div`
  cursor: pointer;
  width: 13%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

function CreateComment({ setData, setCommentLength }) {
  const { boardId } = useParams();
  const userId = 6;

  const [comment, setComment] = useState('');
  const toCreateComment = async () => {
    setComment('');
    await createComment(boardId, userId, comment);
    getOneArticle(boardId).then(response => {
      setData(response.data);
      setCommentLength(response.data.commentList.length);
    });
  };

  return (
    <Wrapper>
      <InputBox>
        <TextArea
          cols={20}
          maxLength={100}
          placeholder={'댓글을 남겨보세요!'}
          value={comment}
          onChange={e => setComment(e.target.value)}
        ></TextArea>
      </InputBox>

      <SubmitImg onClick={toCreateComment}>
        <Image
          src={`${process.env.PUBLIC_URL}/images/send_arrow.svg`}
          width={'26px'}
          height={'21px'}
          margin={'0 0 0 0'}
        ></Image>
      </SubmitImg>
    </Wrapper>
  );
}

export default CreateComment;

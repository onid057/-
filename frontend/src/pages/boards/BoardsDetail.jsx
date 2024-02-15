import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteOneComment, getOneArticle } from '../../apis/api/board';
import { calculateReportWritingTime } from '../../utils/time';

import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoardComment from '../../components/boards/BoardComment';
import BoardsTags from '../../components/boards/BoardsTags';
import UpdateDeleteButton from '../../components/common/UpdateDeleteButton';
import CreateComment from '../../components/boards/CreateComment';
import DeleteBoardModal from '../../components/boards/DeleteBoardModal';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0px 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-weight: 300;
  white-space: pre-wrap;
`;
const ArticleWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 15px;
  padding: 25px 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 25px;
  background-color: white;
`;
const ProfileWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
`;
const ProfileLeft = styled.div`
  width: 100%;
  height: auto;
  flex: 2.5;
  display: flex;
  justify-content: center;
`;
const ProfileRight = styled.div`
  width: 100%;
  height: 30px;
  padding-left: 5px;
  flex: 7.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
`;
const ProfileName = styled.div`
  font-size: 16px;
  font-weight: 500;
`;
const ProfileAddress = styled.div`
  font-size: 14px;
  font-weight: 300;
`;
const TagsWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3px;
`;
const ArticleTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  word-break: keep-all;
  line-height: 28px;
`;
const ArticleContent = styled.div`
  font-size: 18px;
  font-weight: 300;
  line-height: 25px;
`;
const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3px;
  gap: 15px;
  font-size: 16px;
  font-weight: 400;
`;
const CommentLength = styled.span`
  font-size: 16px;
  color: gray;
`;
const ImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
`;

function BoardsDetail() {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [commentLength, setCommentLength] = useState(0);

  useEffect(() => {
    getOneArticle(boardId).then(response => {
      setData(response.data);
      setCommentLength(response.data.commentList.length);
    });
  }, []);

  const toArticleUpdate = () => {
    navigate(`/boards/${boardId}/update`, {
      state: {
        title: data.title,
        content: data.content,
        updatedAt: data.updatedAt,
        tagList: data.tagList,
      },
    });
  };

  const [isArticleDelete, setIsArticleDelete] = useState(false);
  const toArticleDelete = () => {
    setIsArticleDelete(true);
  };

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
        rightContent={'목록'}
        onPrevious={() => {
          navigate(-1);
        }}
        onNext={() => {
          navigate('/boards');
        }}
      ></NavigationBar>

      {isArticleDelete === true && (
        <DeleteBoardModal
          boardId={boardId}
          onClick={() => {
            setIsArticleDelete(() => false);
          }}
        ></DeleteBoardModal>
      )}

      <ArticleWrapper>
        <ProfileWrapper>
          <ProfileLeft>
            <ImageWrapper>
              <Image
                src={
                  data.profileImage ||
                  `${process.env.PUBLIC_URL}/images/profile_img.svg`
                }
                width={'50px'}
                height={'50px'}
              ></Image>
            </ImageWrapper>
          </ProfileLeft>
          <ProfileRight>
            <ProfileName>{data.userName}</ProfileName>
            <ProfileAddress>
              {String(data.address).substring(0, 7)}
            </ProfileAddress>
          </ProfileRight>
        </ProfileWrapper>

        <TagsWrapper>
          {data.tagList?.map((tag, idx) => (
            <BoardsTags key={idx} mode={'SMALL'} tagname={tag}></BoardsTags>
          ))}
        </TagsWrapper>

        <ArticleTitle>{data.title}</ArticleTitle>

        <ArticleContent>{data.content}</ArticleContent>

        {calculateReportWritingTime(data.updatedAt)}

        {data.boardDistinction ? (
          <UpdateDeleteButton
            needUpdateButton={true}
            needDeleteButton={true}
            updateOnClick={() => toArticleUpdate()}
            deleteOnClick={() => toArticleDelete()}
          ></UpdateDeleteButton>
        ) : (
          ''
        )}
      </ArticleWrapper>

      {
        <CommentWrapper>
          <p>
            댓글 <CommentLength>{commentLength}</CommentLength>
          </p>

          {data?.commentList?.map((comment, idx) => (
            <BoardComment
              key={`comment-${idx}`}
              userName={comment.userName}
              profileImage={comment.profileImage}
              content={comment.content}
              updatedAt={comment.updatedAt}
              needUpdateButton={false}
              needDeleteButton={comment.commentDistinction}
              deleteOnClick={() => {
                (async () => {
                  await deleteOneComment(comment.commentId);
                  getOneArticle(boardId).then(response => {
                    setData(response.data);
                    setCommentLength(response.data.commentList.length);
                  });
                })();
              }}
            ></BoardComment>
          ))}
        </CommentWrapper>
      }

      <CreateComment
        setData={setData}
        setCommentLength={setCommentLength}
      ></CreateComment>
    </Wrapper>
  );
}

export default BoardsDetail;

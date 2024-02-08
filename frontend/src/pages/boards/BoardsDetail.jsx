import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoardComment from '../../components/boards/BoardComment';
import BoardsTags from '../../components/boards/BoardsTags';
import UpdateDeleteButton from '../../components/common/UpdateDeleteButton';
import CreateComment from '../../components/boards/CreateComment';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getOneArticle } from '../../apis/api/board';

const Wrapper = styled.div`
  width: 320px;
  min-height: 568px;
  margin: 0 auto;
  padding: 0px 16px;
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
  gap: 25px;
  border-radius: 25px;
  background-color: white;
`;

const ProfileWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  margin-bottom: 10px;
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
  font-weight: 600;
  word-break: keep-all;
  line-height: 28px;
`;

const ArticleContent = styled.div`
  font-size: 18px;
  font-weight: 300;
  word-break: keep-all;
  line-height: 25px;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3px;
  gap: 23px;
  font-size: 18px;
  font-weight: 500;
`;

const CommentLength = styled.span`
  font-size: 18px;
  color: gray;
`;

// 현재 로그인 된 유저 구하기
const getCurrentUser = 'user4';

function BoardsDetail() {
  // 게시판 상세 조회 API 호출
  const [data, setData] = useState({});
  const { boardId } = useParams();

  useEffect(() => {
    getOneArticle(boardId).then(response => {
      console.log('게시판 상세 조회 API 성공');
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  // 게시글 수정 페이지로 이동하는 함수
  const navigate = useNavigate();
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
      ></NavigationBar>

      <ArticleWrapper>
        <ProfileWrapper>
          <ProfileLeft>
            <Image
              src={`${process.env.PUBLIC_URL}/images/profile_img.svg`}
              width={'50px'}
              height={'50px'}
            ></Image>
          </ProfileLeft>
          <ProfileRight>
            <ProfileName>{data.userName}</ProfileName>
            <ProfileAddress>{data.address}</ProfileAddress>
          </ProfileRight>
        </ProfileWrapper>

        <TagsWrapper>
          {data.tagList?.map((tag, idx) => (
            <BoardsTags key={idx} mode={'MEDIUM'} tagname={tag}></BoardsTags>
          ))}
        </TagsWrapper>

        <ArticleTitle>{data.title}</ArticleTitle>

        <ArticleContent>{data.content}</ArticleContent>

        {data.updatedAt}

        {getCurrentUser === data.userName ? (
          <UpdateDeleteButton
            needUpdateButton
            needDeleteButton
            updateOnClick={() => toArticleUpdate()}
            deleteOnClick={() => console.log('게시글 삭제')}
          ></UpdateDeleteButton>
        ) : (
          ''
        )}
      </ArticleWrapper>

      {/* 댓글이 하나도 없을 때 분기 */}
      {/* 댓글 작성자와 currentUser가 같으면 수정/삭제 버튼 나오게 */}
      {!data.commentList ? (
        <p>새 댓글을 작성해 보세요!</p>
      ) : (
        <CommentWrapper>
          <p>
            댓글 <CommentLength>{data.commentList.length}</CommentLength>
          </p>

          {data.commentList.map((comment, idx) => (
            <BoardComment
              key={idx}
              userName={comment.userName}
              content={comment.content}
              updatedAt={comment.updatedAt}
              needUpdateButton={getCurrentUser === comment.userName}
              needDeleteButton={getCurrentUser === comment.userName}
              updateOnClick={() => console.log('댓글 수정')}
              deleteOnClick={() => console.log('댓글 삭제')}
            ></BoardComment>
          ))}
        </CommentWrapper>
      )}

      <CreateComment></CreateComment>
    </Wrapper>
  );
}

export default BoardsDetail;

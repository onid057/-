import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import BoardComment from '../../components/common/BoardComment';
import BoardsTags from '../../components/boards/BoardsTags';
import UpdateDeleteButton from '../../components/common/UpdateDeleteButton';
import HorizontalLine from '../../components/common/HorizontalLine';

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
  font-size: 18px;
  font-weight: 500;
`;

const CommentLength = styled.span`
  font-size: 18px;
  color: gray;
`;

// 게시판 상세 조회 API 호출
const data = {
  userName: 'user4',
  address: '서울시 광진구',
  profileImage: '',
  tags: ['맛집 추천', '생활정보', '집사 추천'],
  title: '안녕하세요.',
  content: '저는 오늘 생일입니다.',
  updatedAt: '2024-01-31T07:37:36.000+00:00',
  commentList: [
    {
      commentId: 1,
      userName: 'user5',
      content: '축하합니다~',
      updatedAt: '2024-01-31T07:37:36.000+00:00',
    },
    {
      commentId: 4,
      userName: 'user3',
      content: 'comment!!',
      updatedAt: '2024-02-06T08:15:28.000+00:00',
    },
    {
      commentId: 5,
      userName: 'user4',
      content: 'comment!!',
      updatedAt: '2024-02-06T08:15:30.000+00:00',
    },
  ],
};

// 나중에 지워용
const getCurrentUser = '사과먹는 어피치';

function BoardsDetail() {
  const userName = '피치피치어피치이십자까지닉네임이된다니이';
  const updatedAt = '3일 전';
  const content =
    '저희 아버지도 강아지를 키우시는데 다음에 여행가실 때 맡겨봐야겠어요~';
  const userName2 = '곽두식';
  const address = '마포구 염리동';

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
          {data.tags.map((tag, idx) => (
            <BoardsTags key={idx} mode={'MEDIUM'} tagname={tag}></BoardsTags>
          ))}
        </TagsWrapper>

        <ArticleTitle>{data.title}</ArticleTitle>

        <ArticleContent>{data.content}</ArticleContent>

        {data.updatedAt}

        {getCurrentUser === data.userName ? (
          <UpdateDeleteButton
            updateButton
            deleteButton
            updateOnClick={''}
            deleteOnClick={''}
          ></UpdateDeleteButton>
        ) : (
          ''
        )}
      </ArticleWrapper>

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
            updateButton
            deleteButton
          ></BoardComment>
        ))}
      </CommentWrapper>
      {/* <HorizontalLine
        marginTop={'2px'}
        marginBottom={'2px'}
        height={'2px'}
        color={'#d9d9d9'}
      ></HorizontalLine> */}
    </Wrapper>
  );
}

export default BoardsDetail;

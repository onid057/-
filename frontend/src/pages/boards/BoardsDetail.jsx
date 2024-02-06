import styled from 'styled-components';
import NavigationBar from '../../components/common/NavigationBar';
import Image from '../../components/common/Image';
import SimpleProfile from '../../components/common/SimpleProfile';

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
  padding: 20px 10px 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 25px;
  background-color: white;
`;

function BoardsDetail() {
  const userName = '피치피치어피치이십자까지닉네임이된다니이';
  const updatedAt = '3일 전';
  const content =
    '저희 아버지도 강아지를 키우시는데 다음에 여행가실 때 맡겨봐야겠어요~';

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
        <SimpleProfile
          userName={userName}
          updatedAt={updatedAt}
          content={content}
          updateButton
          deleteButton
        ></SimpleProfile>
      </ArticleWrapper>

      <SimpleProfile
        userName={userName}
        updatedAt={updatedAt}
        content={content}
        updateButton
        deleteButton
      ></SimpleProfile>
    </Wrapper>
  );
}

export default BoardsDetail;

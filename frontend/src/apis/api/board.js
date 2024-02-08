import axios from '../utils/instance';

// 게시판 리스트 조회
const getAllArticles = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `boards?page=1&size=5`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 게시판 상세 조회
const getOneArticle = async boardId => {
  try {
    const response = await axios({
      method: 'get',
      url: `boards/${boardId}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 게시글 수정
const updateArticle = async (
  boardId,
  newTitle,
  newContent,
  newUpdatedAt,
  newTagList,
) => {
  try {
    const response = await axios({
      method: 'patch',
      url: `boards/${boardId}`,
      data: {
        title: newTitle,
        content: newContent,
        updatedAt: newUpdatedAt,
        tagList: newTagList,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllArticles, getOneArticle, updateArticle };

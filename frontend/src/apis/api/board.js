import axios from '../utils/instance';

// 게시판 리스트 조회
const getAllArticles = async (page, size, tagList) => {
  try {
    const response = await axios({
      method: 'get',
      url: `/boards?page=${page}&size=${size}&tagList=${tagList}`,
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

// 새 게시글 작성
const createArticle = async (title, content, tagList) => {
  try {
    const response = await axios({
      method: 'post',
      url: `boards`,
      data: {
        title: title,
        content: content,
        tagList: tagList,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 게시글 수정
const updateArticle = async (boardId, newTitle, newContent, newTagList) => {
  try {
    const response = await axios({
      method: 'patch',
      url: `boards/${boardId}`,
      data: {
        title: newTitle,
        content: newContent,
        tagList: newTagList,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 게시글 삭제
const deleteOneArticle = async boardId => {
  try {
    const response = await axios({
      method: 'delete',
      url: `boards/${boardId}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 새 댓글 작성
const createComment = async (boardId, userId, content) => {
  try {
    const response = await axios({
      method: 'post',
      url: `comments`,
      data: {
        boardId: boardId,
        userId: userId,
        content: content,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 댓글 수정
const updateOneComment = async (commentId, content) => {
  try {
    const response = await axios({
      method: 'patch',
      url: `comments/${commentId}`,
      data: {
        content: content,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 댓글 삭제
const deleteOneComment = async commentId => {
  try {
    const response = await axios({
      method: 'delete',
      url: `comments/${commentId}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllArticles,
  getOneArticle,
  createArticle,
  updateArticle,
  deleteOneArticle,
  createComment,
  updateOneComment,
  deleteOneComment,
};

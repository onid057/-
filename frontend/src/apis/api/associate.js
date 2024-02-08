import axios from '../utils/instance';

// 대표로 등록하기
const createAssociationAsLeader = async userId => {
  try {
    const response = await axios({
      method: 'post',
      url: '/associations',
      data: {
        userId,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 연동 코드 생성(대표만 가능)
const createAssociationCode = async (userId, userEmail, associationId) => {
  try {
    const response = await axios({
      method: 'post',
      url: '/associations/addition',
      data: {
        userId,
        userEmail,
        associationId,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 대표에게 받은 연동 코드로 연동하기
const associateWithCode = async (userId, code) => {
  try {
    const response = await axios({
      method: 'post',
      url: '/associations/participate',
      data: {
        userId,
        code,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { createAssociationAsLeader, createAssociationCode, associateWithCode };

import axios from '../utils/instance';

// 마이 페이지로
const getSimpleUserInfo = async userId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/users/${userId}`,
    });
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export { getSimpleUserInfo };

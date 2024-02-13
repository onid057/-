import axios from '../utils/instance';

// 마이 페이지로
const getSimpleUserInfo = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `/users`,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export { getSimpleUserInfo };

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

const getDetailUserInfo = async userId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/users/${userId}/detail`,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const updateUserInfo = async (image, ...arg) => {
  const userForm = new FormData();
  const datas = arg[0] || {};
  if (image) {
    userForm.append('image', image);
  }

  userForm.append(
    'request',
    new Blob([JSON.stringify(datas)], { type: 'application/json' }),
  );

  try {
    const response = await axios({
      method: 'patch',
      url: '/users/1',
      data: userForm,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const applyZipsaRequest = async userId => {
  try {
    const response = await axios({
      method: 'patch',
      url: `/users/${userId}/promise`,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getSimpleUserInfo,
  getDetailUserInfo,
  updateUserInfo,
  applyZipsaRequest,
};
import axios from '../utils/instance';

// 정기 보고서 데이터 조회
const getReportData = async roomId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/helpers/reports/${roomId}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 작성된 정기 보고서 보내기
const sendReportData = async (image, roomId, content) => {
  const userForm = new FormData();
  const datas = { roomId, content };
  userForm.append('image', image);
  userForm.append(
    'request',
    new Blob([JSON.stringify(datas)], { type: 'application/json' }),
  );

  try {
    const response = await axios({
      method: 'post',
      url: '/helpers/reports',
      data: userForm,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getReportData, sendReportData };

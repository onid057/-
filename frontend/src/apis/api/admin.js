import axios from '../utils/instance';

// 신고 리스트 조회
const getComplaintList = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: 'admin/report-list',
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getComplaintList };

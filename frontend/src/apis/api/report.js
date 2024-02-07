import axios from '../utils/instance';

// 정기 보고서 데이터 조회
const getReportData = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: '/helpers/reports/2',
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getReportData };

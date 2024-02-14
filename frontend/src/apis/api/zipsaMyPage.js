import axios from '../utils/instance';

// (간단)집사 정보 조회하기
const getSimpleZipsaInfo = async helperId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/helpers/${helperId}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// (세부)집사 정보 조회하기
const getDetailZipsaInfo = async helperId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/helpers/${helperId}/detail`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// (리뷰)집사 정보 조회하기
const getReviewZipsaInfo = async helperId => {
  try {
    const response = await axios({
      method: 'get',
      url: `/helpers/${helperId}/reviews`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 집사 정보 수정하기
const updateZipsaInfo = async (description, preferTag) => {
  try {
    const response = await axios({
      method: 'patch',
      url: `/helpers`,
      data: {
        description: description,
        preferTag: preferTag,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 집사 활동 내역 목록 확인
const getZipsaRecords = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `/helpers/records`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getSimpleZipsaInfo,
  getDetailZipsaInfo,
  getReviewZipsaInfo,
  updateZipsaInfo,
  getZipsaRecords,
};

import axios from '../utils/instance';

// 대표로 등록하기
const createAssociationAsLeader = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: '/associations',
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 나와 연결된 연동 고객 리스트 조회
// useQuery 사용
const getAssociatedUserList = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `/associations`,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 연동 코드 생성(대표만 가능)
const createAssociationCode = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: '/associations/addition',
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 대표에게 받은 연동 코드로 연동하기
const associateWithCode = async code => {
  try {
    const response = await axios({
      method: 'post',
      url: '/associations/participate',
      data: {
        code,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 본인이 대표 계정인지 확인
const confirmIsLeader = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: '/associations/representative',
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  createAssociationAsLeader,
  getAssociatedUserList,
  createAssociationCode,
  associateWithCode,
  confirmIsLeader,
};

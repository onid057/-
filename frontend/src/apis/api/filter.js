import axios from '../utils/instance';

// filterFunnel을 통해 얻은 매치 데이터를 활용하여 집사 리스트 get
// userId가 없으면 내가 연동, 있으면 상대 연동
const getFilteredZipsaData = async (
  userId,
  majorCategoryId,
  genderStr,
  age,
  grade,
  scoreAverage,
) => {
  try {
    const response = await axios({
      method: 'post',
      url: '/matches/filter',
      data: {
        userId,
        majorCategoryId,
        genderStr,
        age,
        grade,
        scoreAverage,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// filterFunnel에서 얻은 정보를 토대로 매칭 시작
const makeFilterSuggestion = async (
  userId,
  subCategoryId,
  title,
  content,
  place,
  estimateDuration,
  roomCreatedAt,
  expectationStartedAt,
  expectationEndedAt,
  expectationPay,
  zipsaList,
) => {
  try {
    const response = await axios({
      method: 'post',
      url: '/matches/choice-helper',
      data: {
        userId,
        subCategoryId,
        title,
        content,
        place,
        estimateDuration,
        roomCreatedAt,
        expectationStartedAt,
        expectationEndedAt,
        expectationPay,
        zipsaList,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getFilteredZipsaData, makeFilterSuggestion };

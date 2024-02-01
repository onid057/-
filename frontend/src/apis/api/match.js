import axios from '../utils/instance';

// filterFunnel을 통해 얻은 매치 데이터를 활용하여 집사 리스트 get
const getFilteredHelperData = async (
  majorCategoryId,
  genderStr,
  age,
  grade,
  scoreAverage,
) => {
  try {
    const response = await axios({
      method: 'get',
      url: '/matches/filter',
      params: {
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
  helperList,
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
        helperList,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getFilteredHelperData, makeFilterSuggestion };

import { useEffect, useState } from 'react';
import ZipsaDetailCategory from './ZipsaDetailCategory';
import ZipsaDetailHistory from './ZipsaDetailHistory';
import ZipsaDetailReview from './ZipsaDetailReview';
import {
  getDetailZipsaInfo,
  getReviewZipsaInfo,
} from '../../apis/api/zipsaMyPage';

function ZipsaDetailRoute({ helperId, component }) {
  // (세부)집사 정보 조회 API 호출
  // (리뷰)집사 정보 조회 API 호출
  const [data, setData] = useState({});
  const [reviews, setReviews] = useState({});
  const [preferTagList, setPreferTagList] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    getDetailZipsaInfo(helperId).then(response => {
      // console.log('(세부)집사 정보 조회 API 성공');
      // console.log('세부 정보 :', response.data);
      setData(response.data);
      setPreferTagList(response.data.preferTag.split('#'));
      setSubCategory(response.data.subCategory);
    });

    getReviewZipsaInfo(helperId).then(response => {
      // console.log('(리뷰)집사 정보 조회 API 성공');
      // console.log('리뷰 :', response.data);
      setReviews(response.data);
    });
  }, []);

  if (component === 'CATEGORY') {
    return (
      <ZipsaDetailCategory
        subCategory={subCategory}
        preferTagList={preferTagList}
      ></ZipsaDetailCategory>
    );
  } else if (component === 'HISTORY') {
    return (
      <ZipsaDetailHistory
        replyAverage={data.replyAverage}
        serviceCount={data.serviceCount}
        kindnessAverage={data.kindnessAverage}
        skillAverage={data.skillAverage}
        rewindAverage={data.rewindAverage}
      ></ZipsaDetailHistory>
    );
  } else if (component === 'REVIEW') {
    return (
      <ZipsaDetailReview
        totalReview={reviews.length}
        reviews={reviews}
      ></ZipsaDetailReview>
    );
  }
}
export default ZipsaDetailRoute;

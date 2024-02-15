import { useEffect, useState } from 'react';
import ZipsaDetailCategory from './ZipsaDetailCategory';
import ZipsaDetailHistory from './ZipsaDetailHistory';
import ZipsaDetailReview from './ZipsaDetailReview';
import {
  getDetailZipsaInfo,
  getReviewZipsaInfo,
} from '../../apis/api/zipsaMyPage';

function ZipsaDetailRoute({ helperId, component }) {
  const [data, setData] = useState({});
  const [reviews, setReviews] = useState({});
  const [preferTagList, setPreferTagList] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    getDetailZipsaInfo(helperId).then(response => {
      setData(response.data);
      setPreferTagList(response.data.preferTag.split('#'));
      setSubCategory(response.data.subCategory);
    });

    getReviewZipsaInfo(helperId).then(response => {
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
        replyAverage={Math.floor(data.replyAverage)}
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

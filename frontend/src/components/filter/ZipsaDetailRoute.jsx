import styled from 'styled-components';
import ZipsaDetailCategory from './ZipsaDetailCategory';
import ZipsaDetailHistory from './ZipsaDetailHistory';
import ZipsaDetailReview from './ZipsaDetailReview';

function ZipsaDetailRoute({
  compo,
  subCategory,
  preferTag,
  replyAverage,
  serviceCount,
  kindnessAverage,
  skillAverage,
  rewindAverage,
  totalReview,
  reviews,
}) {
  if (compo === 'CATEGORY') {
    return (
      <ZipsaDetailCategory
        subCategory={subCategory}
        preferTag={preferTag}
      ></ZipsaDetailCategory>
    );
  } else if (compo === 'HISTORY') {
    return (
      <ZipsaDetailHistory
        replyAverage={replyAverage}
        serviceCount={serviceCount}
        kindnessAverage={kindnessAverage}
        skillAverage={skillAverage}
        rewindAverage={rewindAverage}
      ></ZipsaDetailHistory>
    );
  } else if (compo === 'REVIEW') {
    return (
      <ZipsaDetailReview
        totalReview={totalReview}
        reviews={reviews}
      ></ZipsaDetailReview>
    );
  }
}
export default ZipsaDetailRoute;

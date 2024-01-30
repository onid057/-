import ZipsaDetailCategory from './ZipsaDetailCategory';
import ZipsaDetailHistory from './ZipsaDetailHistory';
import ZipsaDetailReview from './ZipsaDetailReview';

function ZipsaDetailRoute({
  component,
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
  if (component === 'CATEGORY') {
    return (
      <ZipsaDetailCategory
        subCategory={subCategory}
        preferTag={preferTag}
      ></ZipsaDetailCategory>
    );
  } else if (component === 'HISTORY') {
    return (
      <ZipsaDetailHistory
        replyAverage={replyAverage}
        serviceCount={serviceCount}
        kindnessAverage={kindnessAverage}
        skillAverage={skillAverage}
        rewindAverage={rewindAverage}
      ></ZipsaDetailHistory>
    );
  } else if (component === 'REVIEW') {
    return (
      <ZipsaDetailReview
        totalReview={totalReview}
        reviews={reviews}
      ></ZipsaDetailReview>
    );
  }
}
export default ZipsaDetailRoute;

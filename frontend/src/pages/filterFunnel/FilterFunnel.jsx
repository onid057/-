import { useState } from 'react';
import { useFunnel } from '../../hooks/useFunnel';
import { getFilteredHelperData } from '../../apis/api/match';

import MainCategory from './MainCategory';
import SubCategory from './SubCategory';
import Condition from './Condition';
import HelperList from './HelperList';
import TargetDate from './TargetDate';
import TargetTime from './TargetTime';
import Detail from './Detail';

function FilterFunnel() {
  const [filterData, setFilterData] = useState({});
  const [Funnel, setStep] = useFunnel('MAIN_CATEGORY');

  console.log(filterData);

  return (
    <Funnel>
      <Funnel.Step name="MAIN_CATEGORY">
        <MainCategory
          onPrevious={() => {
            setStep('CONDITION');
          }}
          onNext={data => {
            setStep('SUB_CATEGORY');
            setFilterData({ ...filterData, matchMainCategory: data });
          }}
          matchMainCategory={filterData.matchMainCategory}
        ></MainCategory>
      </Funnel.Step>

      <Funnel.Step name="SUB_CATEGORY">
        <SubCategory
          onPrevious={() => {
            setStep('MAIN_CATEGORY');
          }}
          onNext={data => {
            setStep('CONDITION');
            setFilterData({ ...filterData, matchSubCategory: data });
          }}
          matchSubCategory={filterData.matchSubCategory}
        ></SubCategory>
      </Funnel.Step>

      <Funnel.Step name="CONDITION">
        <Condition
          onPrevious={() => {
            setStep('SUB_CATEGORY');
          }}
          onNext={(gender, age, grade, score) => {
            setStep('HELPER_LIST');
            const nextFilterData = {
              ...filterData,
              genderCondition: gender,
              ageCondition: age,
              gradeCondition: grade,
              scoreCondition: score,
            };
            setFilterData(nextFilterData);
            getFilteredHelperData(
              nextFilterData.matchMainCategory,
              nextFilterData.genderCondition,
              nextFilterData.ageCondition,
              nextFilterData.gradeCondition,
              nextFilterData.scoreCondition,
            ).then(response => console.log(response));
          }}
          genderCondition={filterData.genderCondition}
          ageCondition={filterData.ageCondition}
          gradeCondition={filterData.gradeCondition}
          scoreCondition={filterData.scoreCondition}
        ></Condition>
      </Funnel.Step>

      <Funnel.Step name="HELPER_LIST">
        <HelperList
          onPrevious={() => {
            setStep('CONDITION');
          }}
          onNext={data => {
            setStep('DATE');
            setFilterData({ ...filterData, matchSubCategory: data });
          }}
          // matchSubCategory={filterData.matchSubCategory}
        ></HelperList>
      </Funnel.Step>

      {/* 여기까지 플로우 완성 */}

      <Funnel.Step name="DATE">
        <TargetDate
          onPrevious={() => {
            setStep('SUB_CATEGORY');
          }}
          onNext={data => {
            setStep('TIME');
            setFilterData({ ...filterData, matchDate: data });
          }}
          matchDate={filterData.matchDate}
        ></TargetDate>
      </Funnel.Step>

      <Funnel.Step name="TIME">
        <TargetTime
          onPrevious={() => {
            setStep('DATE');
          }}
          onNext={(startTime, endTime) => {
            setStep('DETAIL');
            setFilterData({
              ...filterData,
              matchStartTime: startTime,
              matchEndTime: endTime,
            });
          }}
          matchStartTime={filterData.matchStartTime}
          matchEndTime={filterData.matchEndTime}
        ></TargetTime>
      </Funnel.Step>

      <Funnel.Step name="DETAIL">
        <Detail
          onPrevious={() => {
            setStep('TIME');
          }}
          onNext={data => {
            setStep('CONDITION');
            setFilterData({ ...filterData, matchDetail: data });
          }}
          matchDetail={filterData.matchDetail}
        ></Detail>
      </Funnel.Step>
    </Funnel>
  );
}

export default FilterFunnel;

import { useState } from 'react';
import { useFunnel } from '../../hooks/useFunnel';

import axios from 'axios';

import MainCategory from './MainCategory';
import SubCategory from './SubCategory';
import TargetDate from './TargetDate';
import TargetTime from './TargetTime';
import Detail from './Detail';
import Condition from './Condition';

function FilterFunnel() {
  const [filterData, setFilterData] = useState({});
  const [Funnel, setStep] = useFunnel('MAIN_CATEGORY');

  console.log(filterData);

  return (
    <Funnel>
      <Funnel.Step name="MAIN_CATEGORY">
        <MainCategory
          onPrevious={() => {
            // 추후 변경 요망
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
            // 추후 변경 요망
            setStep('MAIN_CATEGORY');
          }}
          onNext={data => {
            setStep('DATE');
            setFilterData({ ...filterData, matchSubCategory: data });
          }}
          matchSubCategory={filterData.matchSubCategory}
        ></SubCategory>
      </Funnel.Step>

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

      <Funnel.Step name="CONDITION">
        <Condition
          onPrevious={() => {
            setStep('DETAIL');
          }}
          onNext={(gender, age, grade, score) => {
            // setStep('MAIN_CATEGORY');
            setFilterData({
              ...filterData,
              genderCondition: gender,
              ageCondition: age,
              gradeCondition: grade,
              scoreCondition: score,
            });
            axios
              .get('localhost:8080/matches/filter', {
                params: {
                  majorCategoryId: filterData.matchMainCategory,
                  genderStr: filterData.genderCondition,
                  age: filterData.ageCondition,
                  grade: filterData.gradeCondition,
                  scoreAverage: filterData.scoreCondition,
                },
              })
              .then(response => console.log(response));
          }}
          genderCondition={filterData.genderCondition}
          ageCondition={filterData.ageCondition}
          gradeCondition={filterData.gradeCondition}
          scoreCondition={filterData.scoreCondition}
        ></Condition>
      </Funnel.Step>
    </Funnel>
  );
}

export default FilterFunnel;

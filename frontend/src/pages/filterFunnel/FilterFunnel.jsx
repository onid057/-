import { useState } from 'react';
import { useFunnel } from '../../hooks/useFunnel';

import MainCategory from './MainCategory';
import SubCategory from './SubCategory';
import TargetDate from './TargetDate';
import TargetTime from './TargetTime';
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
            setStep('SUB_CATEGORY');
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
          onNext={data => {
            setStep('MAIN_CATEGORY');
            setFilterData({ ...filterData, matchTime: data });
          }}
          matchTime={filterData.matchTime}
        ></TargetTime>
      </Funnel.Step>
    </Funnel>
  );
}

export default FilterFunnel;

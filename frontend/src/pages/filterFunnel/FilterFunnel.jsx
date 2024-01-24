import { useState } from 'react';
import { useFunnel } from '../../hooks/useFunnel';

import MainCategory from './MainCategory';
import SubCategory from './SubCategory';
import Condition from './Condition';
import DateTime from './DateTime';

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
            setStep('DATETIME');
            setFilterData({ ...filterData, matchSubCategory: data });
          }}
          matchSubCategory={filterData.matchSubCategory}
        ></SubCategory>
      </Funnel.Step>

      <Funnel.Step name="DATETIME">
        <DateTime
          onPrevious={() => {
            setStep('SUB_CATEGORY');
          }}
          onNext={data => {
            setStep('MAIN_CATEGORY');
            setFilterData({ ...filterData, matchDateTime: data });
          }}
          matchDateTime={filterData.matchDateTime}
        ></DateTime>
      </Funnel.Step>
    </Funnel>
  );
}

export default FilterFunnel;

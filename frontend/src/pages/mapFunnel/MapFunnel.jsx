import { useState } from 'react';
import { useFunnel } from '../../hooks/useFunnel';
import { useNavigate } from 'react-router-dom';
import { makeFilterSuggestion } from '../../apis/api/filter';

import Map from '../mapFunnel/Map';
import Detail from './Detail';
import TargetDate from './TargetDate';
import TargetTime from './TargetTime';
import Address from './Address';
import SuggestPayment from './SuggestPayment';

function MapFunnel() {
  const [mapData, setMapData] = useState({});
  const [Funnel, setStep] = useFunnel('MAP');
  const navigate = useNavigate();

  return (
    <Funnel>
      <Funnel.Step name="MAP">
        <Map
          onPrevious={() => {
            navigate(-1);
          }}
          onNext={data => {
            setStep('DETAIL');
            setMapData({
              ...mapData,
              zipsaId: data,
            });
          }}
        ></Map>
      </Funnel.Step>

      <Funnel.Step name="DETAIL">
        <Detail
          onPrevious={() => {
            setStep('MAP');
          }}
          onNext={content => {
            setStep('DATE');
            setMapData({
              ...mapData,
              matchContent: content,
            });
          }}
          matchContent={mapData.matchContent}
        ></Detail>
      </Funnel.Step>

      <Funnel.Step name="DATE">
        <TargetDate
          onPrevious={() => {
            setStep('DETAIL');
          }}
          onNext={data => {
            setStep('TIME');
            setMapData({ ...mapData, matchDate: data });
          }}
          matchDate={mapData.matchDate}
        ></TargetDate>
      </Funnel.Step>

      <Funnel.Step name="TIME">
        <TargetTime
          onPrevious={() => {
            setStep('DATE');
          }}
          onNext={(startTime, endTime) => {
            setStep('ADDRESS');
            setMapData({
              ...mapData,
              matchStartTime: startTime,
              matchEndTime: endTime,
            });
          }}
          matchStartTime={mapData.matchStartTime}
          matchEndTime={mapData.matchEndTime}
        ></TargetTime>
      </Funnel.Step>

      <Funnel.Step name="ADDRESS">
        <Address
          onPrevious={() => {
            setStep('TIME');
          }}
          onNext={(address, detailAddress) => {
            setStep('PAYMENT');
            setMapData({
              ...mapData,
              matchAddress: address,
              matchDetailAddress: detailAddress,
            });
          }}
          matchAddress={mapData.matchAddress}
          matchDetailAddress={mapData.matchDetailAddress}
        ></Address>
      </Funnel.Step>

      <Funnel.Step name="PAYMENT">
        <SuggestPayment
          onPrevious={() => {
            setStep('ADDRESS');
          }}
          onNext={payment => {
            const nextMapData = {
              ...mapData,
              matchPayment: payment,
            };
            setMapData(nextMapData);
            makeFilterSuggestion(
              null,
              41,
              '제목 없음',
              nextMapData.matchContent,
              nextMapData.matchAddress + ' ' + nextMapData.matchDetailAddress,
              nextMapData.matchEndTime - nextMapData.matchStartTime,
              new Date().toJSON(),
              new Date(
                nextMapData.matchDate.setHours(
                  parseInt(nextMapData.matchStartTime),
                  0,
                  0,
                  0,
                ),
              ).toJSON(),
              new Date(
                nextMapData.matchDate.setHours(
                  parseInt(nextMapData.matchEndTime),
                  0,
                  0,
                  0,
                ),
              ).toJSON(),
              nextMapData.matchPayment,
              [nextMapData.zipsaId],
            ).then(response => {
              navigate('/startMatch');
            });
          }}
          matchPayment={mapData.matchPayment}
          matchServiceTime={mapData.matchEndTime - mapData.matchStartTime}
        ></SuggestPayment>
      </Funnel.Step>
    </Funnel>
  );
}

export default MapFunnel;

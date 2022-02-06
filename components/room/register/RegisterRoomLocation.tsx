import React, { useState } from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";
import Button from "../../common/Button";
import NavigationIcon from "../../../public/static/svg/register/navigation.svg";
import Selector from "../../common/Selector";
import { countryList } from "../../../lib/staticData";
import Input from "../../common/Input";
import { useSelector } from "../../../store";
import { useDispatch } from "react-redux";
import registerRoom, { registerRooomAction } from "../../../store/registerRoom";
import { getLocationInfoAPI } from "../../../lib/api/map";
import RegisterRoomFooter from "../../register/RegisterRoomFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }

  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
  .register-room-location-button-wrapper {
    width: 176px;
    margin-bottom: 24px;
  }
  .register-room-location-country-selector-wrapper {
    width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-city-district {
    max-width: 385px;
    display: flex;
    margin-bottom: 24px;
    > div:first-child {
      margin-right: 24px;
    }
  }
  .register-room-location-street-address {
    max-width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-detail-address {
    max-width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-postcode {
    max-width: 385px;
  }
`;

const RegisterLocation: React.FC = () => {
  const country = useSelector((state) => state.registerRoom.country);
  const city = useSelector((state) => state.registerRoom.city);
  const district = useSelector((state) => state.registerRoom.district);
  const streetAdddress = useSelector(
    (state) => state.registerRoom.streetAddress
  );
  const detailAddress = useSelector(
    (state) => state.registerRoom.detailAddress
  );
  const postcode = useSelector((state) => state.registerRoom.postcode);

  const dispatch = useDispatch();

  // 현재 주소 불러오기 로딩
  const [loading, setLoading] = useState(false);

  // 나라 변경 시
  const onChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRooomAction.setCountry(event.target.value));
  };

  // 시/도 변경 시
  const onChangecity = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRooomAction.setCity(event.target.value));
  };

  // 시/군/구 변경 시
  const onChangeDistrict = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRooomAction.setDistrict(event.target.value));
  };

  // 도로명 주소 변경시
  const onChangeStreetAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(registerRooomAction.setStreetAddress(event.target.value));
  };

  // 동 호수 변경시
  const onChangeDetailAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(registerRooomAction.setDetailAddress(event.target.value));
  };

  // 우편변호 변경 시
  const onChangePostcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRooomAction.setPostCode(event.target.value));
  };

  // 현재 위치 불러오기에 성공했을때
  const onSuccessGetLocation = async ({coords}: {coords: GeolocationCoordinates}) => {
      try{
          const {data: currentLocation} = await getLocationInfoAPI({
              latitude: coords.latitude,
              longtitude: coords.longitude,
          });
          console.log(currentLocation);

          dispatch(registerRooomAction.setCountry(currentLocation.country));
          dispatch(registerRooomAction.setCity(currentLocation.city));
          dispatch(registerRooomAction.setDistrict(currentLocation.district));
          dispatch(registerRooomAction.setStreetAddress(currentLocation.streetAddress));
          dispatch(registerRooomAction.setPostCode(currentLocation.postcode));
          dispatch(registerRooomAction.setLatitude(currentLocation.latitude));
          dispatch(registerRooomAction.setLongtitude(currentLocation.longtitude));

      }catch(e){
          console.log(e);
          alert(e?.message);
      }
      setLoading(false);
  }

  // 현재 위치 사용 클릭 시
  const onClickGetCurrentLocation = () => {
    setLoading(true);
      navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
          console.log(e);
          alert(e?.message);
      })
  }

  return (
    <Container>
      <h2>숙소의 위치를 알려주세요.</h2>
      <h3>4단계</h3>
      <p className="register-room-step-info">
        정확한 숙소 주소는 게스트가 예약을 완료한 후에만 공개됩니다.
      </p>
      <div className="register-room-location-button-wrapper">
        <Button
          color="dark_cran"
          colorReverse
          width="180px"
          icon={<NavigationIcon />}
          onClick={onClickGetCurrentLocation}
        >
          {loading ? "불러오는 중..." : "현재 위치 사용"}
        </Button>
      </div>
      <div className="register-room-location-country-selector-wrapper">
        <Selector
          type="register"
          options={countryList}
          useValidation={false}
          defaultValue="국가/지역 선택"
          disabledOptions={["국가/지역 선택"]}
          value={country}
          onChange={onChangeCountry}
        />
      </div>
      <div className="register-room-location-city-district">
        <Input label="시/도" value={city} onChange={onChangecity} />
        <Input label="시/군/구" value={district} onChange={onChangeDistrict} />
      </div>
      <div className="register-room-location-street-address">
        <Input label="도로명 주소" value={streetAdddress} onChange={onChangeStreetAddress} />
      </div>
      <div className="register-room-location-detail-address">
        <Input label="동호수(선택 사항)" useValidation={false} />
      </div>
      <div className="register-room-location-postcode">
        <Input label="우편번호" />
      </div>
      <RegisterRoomFooter
        prevHref="/room/register/bathroom"
        nextHref="/room/register/geometry"
      />
    </Container>
  );
};

export default RegisterLocation;

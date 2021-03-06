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

  // ?????? ?????? ???????????? ??????
  const [loading, setLoading] = useState(false);

  // ?????? ?????? ???
  const onChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRooomAction.setCountry(event.target.value));
  };

  // ???/??? ?????? ???
  const onChangecity = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRooomAction.setCity(event.target.value));
  };

  // ???/???/??? ?????? ???
  const onChangeDistrict = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRooomAction.setDistrict(event.target.value));
  };

  // ????????? ?????? ?????????
  const onChangeStreetAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(registerRooomAction.setStreetAddress(event.target.value));
  };

  // ??? ?????? ?????????
  const onChangeDetailAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(registerRooomAction.setDetailAddress(event.target.value));
  };

  // ???????????? ?????? ???
  const onChangePostcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRooomAction.setPostCode(event.target.value));
  };

  const longitude = useSelector((state) => state.registerRoom.longitude);

  // ?????? ?????? ??????????????? ???????????????
  const onSuccessGetLocation = async ({
    coords,
  }: {
    coords: GeolocationCoordinates;
  }) => {
    try {
      const { data: currentLocation } = await getLocationInfoAPI({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      console.log(coords);
      dispatch(registerRooomAction.setCountry(currentLocation.country));
      dispatch(registerRooomAction.setCity(currentLocation.city));
      dispatch(registerRooomAction.setDistrict(currentLocation.district));
      dispatch(
        registerRooomAction.setStreetAddress(currentLocation.streetAddress)
      );
      dispatch(registerRooomAction.setPostCode(currentLocation.postcode));
      dispatch(registerRooomAction.setLatitude(currentLocation.latitude));
      dispatch(registerRooomAction.setLongitude(currentLocation.longitude));
    } catch (e) {
      console.log(e);
      alert(e?.message);
    }
    setLoading(false);
  };

  // ?????? ?????? ?????? ?????? ???
  const onClickGetCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
      console.log(e);
      alert(e?.message);
    });
    console.log(longitude);
  };

  return (
    <Container>
      <h2>????????? ????????? ???????????????.</h2>
      <h3>4??????</h3>
      <p className="register-room-step-info">
        ????????? ?????? ????????? ???????????? ????????? ????????? ????????? ???????????????.
      </p>
      <div className="register-room-location-button-wrapper">
        <Button
          color="dark_cran"
          colorReverse
          width="180px"
          icon={<NavigationIcon />}
          onClick={onClickGetCurrentLocation}
        >
          {loading ? "???????????? ???..." : "?????? ?????? ??????"}
        </Button>
      </div>
      <div className="register-room-location-country-selector-wrapper">
        <Selector
          type="register"
          options={countryList}
          useValidation={false}
          defaultValue="??????/?????? ??????"
          disabledOptions={["??????/?????? ??????"]}
          value={country}
          onChange={onChangeCountry}
        />
      </div>
      <div className="register-room-location-city-district">
        <Input label="???/???" value={city} onChange={onChangecity} />
        <Input label="???/???/???" value={district} onChange={onChangeDistrict} />
      </div>
      <div className="register-room-location-street-address">
        <Input
          label="????????? ??????"
          value={streetAdddress}
          onChange={onChangeStreetAddress}
        />
      </div>
      <div
        className="register-room-location-detail-address"
        onChange={onChangeDetailAddress}
      >
        <Input
          label="?????????(?????? ??????)"
          value={detailAddress}
          useValidation={false}
        />
      </div>
      <div
        className="register-room-location-postcode"
        onChange={onChangePostcode}
      >
        <Input label="????????????" value={postcode} />
      </div>
      <RegisterRoomFooter
        prevHref="/room/register/bathroom"
        nextHref="/room/register/geometry"
      />
    </Container>
  );
};

export default RegisterLocation;

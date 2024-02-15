const getLngLatFromAddress = async address => {
  const geocoder = new window.kakao.maps.services.Geocoder();

  return await new Promise(resolve => {
    geocoder.addressSearch(address, function (result) {
      resolve(new window.kakao.maps.LatLng(result[0].y, result[0].x));
    });
  });
};

export { getLngLatFromAddress };

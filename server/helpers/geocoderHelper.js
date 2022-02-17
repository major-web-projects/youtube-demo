import nodeGeocoder from "node-geocoder";

let options = {
  provider: "openstreetmap",
  //   httpAdapter: "https",
  //   formatter: null,
};

const geocoder = nodeGeocoder(options);

export default geocoder;

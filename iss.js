const request = require("request");

//const ipAdd = "https://api.ipify.org?format=json";

// const fetchMyIP = function (callback) {
//   // use request to fetch IP address from JSON API
//   request(ipAdd, (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     } else if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }
//     callback(null, body);
//     return;
//   });
// };
// 

// fetchCoordsByIP((error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log(
//     `Latitude and Longitude: ${coordinates.latitude}${coordinates.longitude}`
//   );
//   //console.log(coordinates);
// });

//module.exports = { fetchMyIP, fetchCoordsByIP };
//************************

const fetchISSFlyOverTimes = function(coords, callback) {
  console.log('This is coords.....', coords);
  const url = //`http://api.open-notify.org/iss-pass.json?lat=41&lon=-88`;
    `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    
    console.log('response.....',response);
    if (error) {
      callback(error, null);
      console.log("Error:", error);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching the pass times: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const passes = JSON.parse(body).response;
      callback(null, passes);
    }
  });
  //43.653225, -79.383186
  //49.27670' -123.13000
};
const exampleCoords = { latitude: 41, longitude: -88 };
fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned flyover times:' , passTimes);
});
//
//http://api.open-notify.org/iss-pass.json?lat=49.27670&lon=-123.13000
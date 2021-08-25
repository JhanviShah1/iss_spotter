const request = require("request");

const ipAdd = "https://api.ipify.org?format=json";

const fetchMyIP = function (callback) {
  request(ipAdd, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, body);
    return;
  });
};

const fetchCoordsByIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`
        ),
        null
      );
      return;
    }
    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };

//*************************************************************************************

const fetchISSFlyOverTimes = function (exampleCoords, callback) {
  console.log('This is coords.....', exampleCoords);
  const url =
    `https://web.archive.org/web/20210601013335/http://api.open-notify.org/iss-pass.json?lat=${exampleCoords.latitude}&lon=${exampleCoords.longitude}`;

  request(url, (error, response, body) => {
    console.log("response.....", response);
    if (error) {
      callback(error, null);
      console.log("Error:", error);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching the pass times: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // else {
    //   const passes = JSON.parse(body).response;
    //   callback(null, passes);
    // }
  });
};
const exampleCoords = { latitude: 41, longitude: -88 };
fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned flyover times:", passTimes);
});
//
//http://api.open-notify.org/iss-pass.json?lat=49.27670&lon=-123.13000

//*********************************************************************************** */

// const nextISSTimesForMyLocation = function(callback) {
//   fetchMyIP((error, ip) => {
//     if (error) {
//       return callback(error, null);
//     }

//     fetchCoordsByIP(ip, (error, coordinates) => {
//       if (error) {
//         return callback(error, null);
//       }

//       fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
//         if (error) {
//           return callback(error, null);
//         }

//         callback(null, passTimes);
//       });
//     });
//   });
// };

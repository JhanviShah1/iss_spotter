const request = require("request");

const fetchISSFlyOverTimes = function (exampleCoords) {
  console.log("This is coords.....", exampleCoords);
  const url = `https://web.archive.org/web/20210601013335/http://api.open-notify.org/iss-pass.json?lat=${exampleCoords.latitude}&lon=${exampleCoords.longitude}`;

  request(url, (error, response, body) => {
    if (!error) {
      //console.log("body.....", body);
      const passes = JSON.parse(body);
      console.log(passes);
      //return;
    }
  });
};

const exampleCoords = { latitude: 41, longitude: -88 };
fetchISSFlyOverTimes(exampleCoords);

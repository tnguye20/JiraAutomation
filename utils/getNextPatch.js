const config = require('../config');
const { extractVersionComponents } = require('./extractVersionComponents');
const axios = require('axios');

const getNextPatch = async ( version ) => {
  try {

    if ( version.indexOf("-rc") !== -1 ) return {};

    const { mainVersion, subVersion } = extractVersionComponents(version);
    const url = config.GITLAB_URL + "repository/tags";
    const options = {
      headers: {
        "PRIVATE-TOKEN": config.GITLAB_TOKEN
      }
    };
    const params = {
      search: `${mainVersion}.${subVersion}.`
    }
    const response = await axios.get(url, {
      ...options,
      params
    });
    const { status, data } = response;
    if ( status === 200 ){
      const latestPatch = data[0].name;
      const nextPatch = Number(latestPatch.split(".").pop()) + 1;
      return {
        latest: latestPatch,
        next: `${mainVersion}.${subVersion}.${nextPatch}`
      };
    }
    return {};
  } catch (err) {
    console.log(err);
    if ( err.response && err.response.data ){
      // const { status } = err.response;
      // const { errorMsg, errorTitle } = err.response.data;
      return {};
    }
    throw err;
  }
}

module.exports = {
  getNextPatch
}

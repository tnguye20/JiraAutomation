const axios = require('axios');
const config = require('../config');

const gitMakeBranch = async (gitBranches) => {
  try {
    const url = config.GITLAB_URL + "repository/branches";
    const options = {
      headers: {
        "PRIVATE-TOKEN": config.GITLAB_TOKEN
      }
    };
    const responses = [];
    gitBranches.forEach( item => {
      const { branch, sourceBranch } = item;
      const data = {
        branch: branch,
        ref: sourceBranch
      }
      responses.push( axios.post(url, data, options) );
    });
    let r = await Promise.all(responses);
    r = r.map( _r => ({
      status: _r.status,
      statusText: _r.statusText,
      data: _r.data
    }));
    return r;
  } catch ( err ) {
    console.log(err);
    if ( err.response && err.response.data ){
      const { status } = err.response;
      const { errorMsg, errorTitle } = err.response.data;
      return {
        status,
        errorTitle,
        errorMsg
      }
    }
    throw err;
  }
}

module.exports = {
  gitMakeBranch
};

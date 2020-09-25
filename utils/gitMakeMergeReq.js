const axios = require('axios');
const config = require('../config');

module.exports.gitMakeMergeReq = async (mergeReqs) => {
  try {
    const url = config.GITLAB_URL + "merge_requests";
    const options = {
      headers: {
        "PRIVATE-TOKEN": config.GITLAB_TOKEN
      }
    };
    const responses = [];
    gitBranches.forEach( item => {
      let { branch, sourceBranch, title, description } = item;
      const data = {
        source_branch: branch,
        target_branch: sourceBranch,
        title,
        description,
        remove_source_branch: true
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
  } catch (err) {
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

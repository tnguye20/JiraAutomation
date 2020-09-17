module.exports.makeFindIssues = ({ jira }) => {
  return async ( issues ) => {
    try {
      const issuePromises = [];
      issues.forEach( issue => issuePromises.push(jira.findIssue(issue)) );
      let response =  await Promise.allSettled(issuePromises);
      return response.filter( r => ( r.status === "fulfilled" ) ).map( r => ( r.value ) );
    } catch (err) {
      console.log(err);
      return {
        error: true,
        errorMsg: err.error.errorMessages
      }
    }
  }
}

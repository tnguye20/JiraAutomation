module.exports.makeCheckRelease = ( { jira } ) => {
  return async ( nextRelease ) => {
    try {
      const jql = `issuetype = Release AND status != Terminated AND summary ~ 'Release Ticket ${nextRelease}'`;
      const response = await jira.searchJira(jql);
      return {
        total: response.total,
        issues: response.issues
      }
    } catch( err ) {
      console.log(err);
      return {
        total: 0,
        issues: []
      };
    }
  }
}

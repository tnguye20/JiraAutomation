module.exports.makeFindIssues = ({ jira }) => {
  return async ( issues ) => {
    try {
      if(!Array.isArray(issues)){
        throw new Error(`Array of Issues required, ${typeof issues} provided`);
      }
      const issuePromises = jira.findIssue(issue);
      return await Promise.all(issuePromises);
    } catch (err) {
      console.log(err);
      return {
        isError: true,
        error: err.msg
      }
    }
  }
}

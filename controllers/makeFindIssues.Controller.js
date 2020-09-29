module.exports.makeFindIssuesController = ({ findIssues }) => {
  return async ( req ) => {
    const issues = req.body.issues;
    if(!Array.isArray(issues)){
      throw new Error(`Array of Issues required, ${typeof issues} provided`);
    }
    const response = await findIssues(issues);
    if ( response.error ){
      throw new Error(response.errorMsg);
    }
    return {
      statusCode: 200,
      body: response
    }
  }
}

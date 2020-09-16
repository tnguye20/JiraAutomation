module.exports.makeFindIssuesController = ({ findIssues }) => {
  return async ( req ) => {
    const issues = req.body.issues;
    const response = await findIssues(issues);
    return {
      statusCode: 200,
      body: response
    }
  }
}

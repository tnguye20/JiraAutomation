const { jira } = require('../utils/');
const { makeFindIssues } = require('./makeFindIssues');

const findIssues = makeFindIssues({ jira });

module.exports = {
  findIssues
};

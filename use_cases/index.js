const { jira } = require('../utils/');
const { makeFindIssues } = require('./makeFindIssues');
const { makeGetTicketsFromReleaseRange } = require('./makeGetTicketsFromReleaseRange');

const { getLog } = require('../utils');

const findIssues = makeFindIssues({ jira });
const getTicketsFromReleaseRange = makeGetTicketsFromReleaseRange({ findIssues, getLog });

module.exports = {
  findIssues,
  getTicketsFromReleaseRange
};

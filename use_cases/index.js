const { jira, exec } = require('../utils/');
const { makeGetTicketsFromReleaseRange, makeFindIssues, makeCheckRelease } = require('./jira');
const { makeGetLog, makeGetNextRelease } = require('./git');
const config = require('../config');

const findIssues = makeFindIssues({ jira });
const checkRelease = makeCheckRelease({ jira });
const getLog = makeGetLog({ exec, config });
const getTicketsFromReleaseRange = makeGetTicketsFromReleaseRange({ findIssues, getLog });
const getNextRelease = makeGetNextRelease({ exec, config });

module.exports = {
  findIssues,
  getTicketsFromReleaseRange,
  getLog,
  getNextRelease,
  checkRelease
};

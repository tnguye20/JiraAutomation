const { jira, exec, extractVersionComponents, isLegacyVersion, getNextPatches } = require('../utils/');
const { makeGetTicketsFromReleaseRange, makeFindIssues, makeCheckRelease, makeGetCustomerInfo } = require('./jira');
const { makeGetLog, makeGetNextRelease, makeGetBranchesFromTicket } = require('./git');
const config = require('../config');
const axios = require('axios');

const findIssues = makeFindIssues({ jira });
const checkRelease = makeCheckRelease({ jira });
const getLog = makeGetLog({ exec, config });
const getTicketsFromReleaseRange = makeGetTicketsFromReleaseRange({ findIssues, getLog });
const getNextRelease = makeGetNextRelease({ exec, config });
const getCustomerInfo = makeGetCustomerInfo({ config, requests: axios, extractVersionComponents });
const getBranchesFromTicket = makeGetBranchesFromTicket({ jira, config, getCustomerInfo, extractVersionComponents, isLegacyVersion, getNextPatches });

module.exports = {
  findIssues,
  getTicketsFromReleaseRange,
  getLog,
  getNextRelease,
  checkRelease,
  getCustomerInfo,
  getBranchesFromTicket
};

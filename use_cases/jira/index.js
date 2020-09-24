const { makeFindIssues } = require('./makeFindIssues');
const { makeGetTicketsFromReleaseRange } = require('./makeGetTicketsFromReleaseRange');
const { makeCheckRelease } = require('./makeCheckRelease');
const { makeGetCustomerInfo } = require('./makeGetCustomerInfo');

module.exports = {
  makeFindIssues,
  makeGetTicketsFromReleaseRange,
  makeCheckRelease,
  makeGetCustomerInfo
}

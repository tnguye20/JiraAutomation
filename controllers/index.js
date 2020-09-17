const { findIssues, getTicketsFromReleaseRange } = require('../use_cases/');
const { makeFindIssuesController } = require('./makeFindIssues.Controller');
const { makeGetTicketsFromReleaseRange } = require('./makeGetTicketsFromReleaseRange.Controller');

const _findIssues = makeFindIssuesController({ findIssues });
const _getTicketFromReleaseRange = makeGetTicketsFromReleaseRange({ getTicketsFromReleaseRange });

module.exports = {
  findIssues: _findIssues,
  getTicketsFromReleaseRange: _getTicketFromReleaseRange
}

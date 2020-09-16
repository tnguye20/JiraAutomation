const { findIssues } = require('../use_cases/');
const { makeFindIssuesController } = require('./makeFindIssuesController');

const _findIssues = makeFindIssuesController({ findIssues });

module.exports = {
  findIssues: _findIssues
}

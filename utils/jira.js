const JiraAPI = require('jira-client');

const {
  JIRA_PROTOCOL,
  JIRA_USER,
  JIRA_PASSWD,
  JIRA_SERVER,
  JIRA_PORT,
} = require('../config');

// Initialize
module.exports.jira = new JiraAPI({
  protocol: JIRA_PROTOCOL,
  username: JIRA_USER,
  host: JIRA_SERVER,
  password: JIRA_PASSWD,
  port: JIRA_PORT,
})

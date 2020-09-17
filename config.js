require('dotenv').config();

module.exports = {
  JIRA_USER: process.env.JIRA_USER,
  JIRA_PASSWD: process.env.JIRA_PASSWD,
  JIRA_SERVER: process.env.JIRA_SERVER,
  JIRA_PORT: process.env.JIRA_PORT,
  JIRA_PROTOCOL: 'https',
  REPO_DIR: '/home/tnguye20/repo/enquesta/'
}

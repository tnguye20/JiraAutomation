const jiraRouter = require('express').Router();
const { express_callback } = require('../utils/');
const { findIssues, getTicketsFromReleaseRange } = require('../controllers');

jiraRouter.get("/", (req, res) => res.status(200).json({body: "Welcome to S&S Internal Jira Automation API"}));
jiraRouter.post("/", (req, res) => res.status(200).json({body: "Welcome to S&S Internal Jira Automation API"}));

jiraRouter.post("/findIssues", express_callback(findIssues));
jiraRouter.post("/getTicketsFromReleaseRange", express_callback(getTicketsFromReleaseRange));

jiraRouter.post("/test", async (req, res) => {
  const config = require('../config');
  const { getBranchesFromTicket } = require('../use_cases');
  const { jira } = require('../utils');
  const { fields, key } = req.body;
  const {
      priority,
      assignee,
      summary,
      versions,
      fixVersions
    } = fields;

  const options =  {
    type: ""
  }
  if (priority.name === config.SHOWSTOPPER) options.type = config.HOTFIX;

  const response = await getBranchesFromTicket({key, fields, options });
  res.json(response);
});

module.exports = jiraRouter;

const jiraRouter = require('express').Router();
const { express_callback } = require('../utils/');
const { findIssues, getTicketsFromReleaseRange } = require('../controllers');

jiraRouter.get("/", (req, res) => res.status(200).json({body: "Welcome to S&S Internal Jira Automation API"}));
jiraRouter.post("/", (req, res) => res.status(200).json({body: "Welcome to S&S Internal Jira Automation API"}));

jiraRouter.post("/findIssues", express_callback(findIssues));
jiraRouter.post("/getTicketsFromReleaseRange", express_callback(getTicketsFromReleaseRange));

jiraRouter.post("/test", async (req, res) => {
  const { fields, key } = req.body;
  console.log(req.body);
  console.log(key);
  res.json("Please");
});

module.exports = jiraRouter;

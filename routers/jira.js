const jiraRouter = require('express').Router();
const { express_callback } = require('../utils/');
const { makeFindIssuesController } = require('../controllers');

jiraRouter.get("/", (req, res) => res.status(200).json({body: "Welcome to S&S Internal Jira Automation API"}));
jiraRouter.post("/", (req, res) => res.status(200).json({body: "Welcome to S&S Internal Jira Automation API"}));

jiraRouter.post("/findIssues", express_callback(makeFindIssuesController));

module.exports = jiraRouter;

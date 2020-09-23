const jiraRouter = require('express').Router();
const { express_callback } = require('../utils/');
const { findIssues, getTicketsFromReleaseRange } = require('../controllers');

jiraRouter.get("/", (req, res) => res.status(200).json({body: "Welcome to S&S Internal Jira Automation API"}));
jiraRouter.post("/", (req, res) => res.status(200).json({body: "Welcome to S&S Internal Jira Automation API"}));

jiraRouter.post("/findIssues", express_callback(findIssues));
jiraRouter.post("/getTicketsFromReleaseRange", express_callback(getTicketsFromReleaseRange));

jiraRouter.post("/test", async (req, res) => {
  const axios = require('axios');
  const config = require('../config');
  const { extractVersionComponents } = require('../utils');
  const params = {
    "apiKey": config.JIRA_PASSWD,
    "userName": config.JIRA_USER,
    "command": "getcompanies",
  }
  let response = await axios.get(`${config.CRM_URL}?apiKey=${config.JIRA_PASSWD}&userName=${config.JIRA_USER}&command=getcompanies`);

  const { success, companies } = response.data;
  if( success === false ) return [];
  response =  {
    customers: {},
    versions: {}
  }
  companies.forEach( company => {
    response.customers[company.name] = {
      "shortName": company.shortName,
      "gitDevelopBranch": company[config.CRM_KEYS.gitDevelopBranch],
      "gitMasterBranch": company[config.CRM_KEYS.gitMasterBranch],
      "name": company.name,
      "id": company.id,
      "enQuestaVersion": company[config.CRM_KEYS.enQuestaVersion],
      "enQuestaVersionTrain": company[config.CRM_KEYS.enQuestaVersionTrain]
    }
    const version = extractVersionComponents(company[config.CRM_KEYS.enQuestaVersion]);
    if (Object.keys(version).length === 4) {
      const { mainVersion, subVersion } = version;
      console.log(version);
      let versionKey = "";
      if (subVersion.length < 5){
        versionKey = mainVersion
      } else {
        versionKey = mainVersion + "." + subVersion.slice(0, 2);
      }
      if (response.versions.versionKey === undefined){
        response.versions[versionKey] = {
          "gitDevelopBranch": company[config.CRM_KEYS.gitDevelopBranch],
          "gitMasterBranch": company[config.CRM_KEYS.gitMasterBranch],
        };
      }
    }
  });
  res.json(response);
});

module.exports = jiraRouter;

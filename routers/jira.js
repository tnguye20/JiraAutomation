const jiraRouter = require('express').Router();
const { express_callback } = require('../utils/');
const { extractTicketInfo } = require('../middlewares/');
const { findIssues, getTicketsFromReleaseRange } = require('../controllers');

jiraRouter.get("/", (req, res) => res.status(200).json({body: "Welcome to S&S Internal Jira Automation API"}));
jiraRouter.post("/", (req, res) => res.status(200).json({body: "Welcome to S&S Internal Jira Automation API"}));

jiraRouter.post("/findIssues", express_callback(findIssues));
jiraRouter.post("/getTicketsFromReleaseRange", express_callback(getTicketsFromReleaseRange));

jiraRouter.post("/test", extractTicketInfo, async (req, res) => {
  const config = require('../config');
  const { getBranchesFromTicket, getCustomerInfo } = require('../use_cases');
  const { jira, gitMakeBranch } = require('../utils');

  const { ticket } = req;
  let branchNames = [];
  let issue = {};
  try{
    branchNames = await getBranchesFromTicket({ ticket });
    const { customers } = await getCustomerInfo();
    // const response = await gitMakeBranch(branchNames);

    const JIRA_URL = `${config.JIRA_PROTOCOL}://${config.JIRA_SERVER}${ config.JIRA_PORT ? ":" + config.JIRA_PORT : ''}`;
    issue = {
      fields: {
        project: {
          key: "CSUP"
        },
        summary: "Jira Test",
        description: "Read the summary",
        priority: {
          // 'name': config.SHOWSTOPPER
          'name': 'Low'
        },
        issuetype: {
          'name': "Release"
        },
        [config.IMPACT]: "Hotfix Release", // Impact **
        [config.REPLICATION_NOTE]: "No replication required", // Replication Notes **
        [config.FUNCTIONAL_AREA]: {
            "id": "11502",
            "self": `${JIRA_URL}/rest/api/2/customFieldOption/11502`,
            "value": "Unsure / Not List"
        } // Functional Area ** - None
      }
    };

    const createMetadata = await jira.getIssueCreateMetadata({
      projectKeys: ["CSUP"],
      issuetypeNames: ["Release"],
      expand: 'projects.issuetypes.fields'
    });
    const allowedValues = createMetadata.projects[0].issuetypes[0].fields;
    let allowToAddCompany = false;
    if( allowedValues[config.COMPANY_KEY] !== undefined ){
      console.log("Can add Company. Slamming it in there.");
      issue[config.COMPANY_KEY] = {
        id: customers[ticket.company].id,
        self: `${JIRA_URL}/rest/api/2/customFieldOption/${customers[ticket.company].id}`,
        value: ticket.company
      };
      allowToAddCompany = true;
    } else {
      console.log("Can't add Company. Will update the issue with that data once created instead");
    }

    // const addResponse = await jira.addNewIssue(issue);
    // const hotfixKey = addResponse.key;

    const update = {
      fields: {
        versions: [
          { name: '6.32.1' }
        ]
      }
    }
    if ( !allowToAddCompany ) {
      update.fields[config.COMPANY_KEY] = {
        id: customers[ticket.company].id,
        self: `${config.JIRA_PROTOCOL}://${config.JIRA_SERVER}${ config.JIRA_PORT ? ":" + config.JIRA_PORT : ''}/rest/api/2/customFieldOption/${customers[ticket.company].id}`,
        value: ticket.company
      };
    }

    const updateResponse = await jira.updateIssue("CSUP-17246", update);

    res.json(updateResponse);
  } catch(err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = jiraRouter;

module.exports.makeGetCustomerInfo = ({ config, extractVersionComponents, requests }) => {
  return async (companyName) => {
  let response;
  if( companyName === undefined ){
    response = await requests.get(`${config.CRM_URL}?apiKey=${config.JIRA_PASSWD}&userName=${config.JIRA_USER}&command=getcompanies`);
  } else {
    response = await requests.get(`${config.CRM_URL}?apiKey=${config.JIRA_PASSWD}&userName=${config.JIRA_USER}&command=getcompanybyname&companyName=${companyName}`);
  }

  let { success, companies } = response.data;
  // Singular company
  if ( companies === undefined && companyName !== undefined ){
    response.data.name = companyName;
    companies = [response.data];
  }
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
    try {
      const version = extractVersionComponents(company[config.CRM_KEYS.enQuestaVersion]);
      if (version !== null) {
        const { mainVersion, subVersion } = version;
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
    } catch( err ){
      // console.log(err);
    }
  });
  return response;
  }
}

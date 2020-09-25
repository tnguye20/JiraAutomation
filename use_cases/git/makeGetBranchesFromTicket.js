module.exports.makeGetBranchesFromTicket = ({
  jira,
  config,
  getCustomerInfo,
  isLegacyVersion,
  extractVersionComponents,
  getNextPatches
}) => {
  return async ({ key, fields, options }) => {
    const {
      COMPANY_KEY,
      SS_COMPANY,
      RELEASE,
      HOTFIX,
      RELEASEFIX
    } = config;
    try {
      const company = (fields[COMPANY_KEY] !== undefined ? fields[COMPANY_KEY].value : SS_COMPANY);
      let { versions } = fields;
      versions = versions.map( version => version.name );
      const { customers } = await getCustomerInfo();
      const { type } = options;
      let gitBranches = [];
      if ( customers[company] !== undefined ){
        switch(type) {
          case RELEASE:
            break;
          case RELEASEFIX:
            break;
          case HOTFIX:
            // Check to see if there is a pending release ticket and branch off of that instead
            const jql = `company = "${company}" and project = "CSUP" and status not in ('Finalize Release', 'Closed', 'Closed_', 'Terminated') and issuetype = "Release" and summary ~ "Release Ticket"`;
            const response = await jira.searchJira(jql);
            if ( response.total > 0 ){
              const releaseTicket = response.issues[0];
              const __fixVersions = releaseTicket.fields.fixVersions;
              __fixVersions.forEach( fixVersion => {
                const { name } = fixVersion;
                const { mainVersion, subVersion } = extractVersionComponents(name);
                const sourceBranch = `release/${mainVersion}.${subVersion}.x`;
                const branch = `${sourceBranch}-${key}`;
                gitBranches.push({
                  branch,
                  sourceBranch
                });
              });
            }
            // Loop through affected version to generate hotfix branches
            const nextPatches = await getNextPatches(versions);
            nextPatches.forEach( nextPatch => {
              const { latest, next } = nextPatch;
              if( next !== undefined ){
                gitBranches.push({
                  branch: `hotfix/${latest}/${key}`,
                  sourceBranch: latest
                });
              }
            });
            break;
          default:
            const genericBranch = "feature/" + key;
            const {
              gitMasterBranch,
              gitDevelopBranch,
              enQuestaVersion
            } = customers[company];
            gitBranches.push({
              branch: genericBranch,
              sourceBranch: gitDevelopBranch,
              gitDevelopBranch,
              gitMasterBranch
            });
            if ( isLegacyVersion(enQuestaVersion) ){
              const {
                mainVersion,
                subVersion
              } = extractVersionComponents(enQuestaVersion);
              const branch = "feature/" + mainVersion + "." + subVersion.slice(0, 2) + "000.x/" + key;
              gitBranches.push({
                branch,
                sourceBranch: "support/" + mainVersion + "." + subVersion.slice(0, 2) + "000.x",
                gitDevelopBranch: "support/" + mainVersion + "." + subVersion.slice(0, 2) + "000.x",
                gitMasterBranch: "main/" + mainVersion + "." + subVersion.slice(0, 2) + "000.x"
              })
            }
            break;
        }
        return gitBranches;
      }
      return [];
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}

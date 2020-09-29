module.exports.makeGetBranchesFromTicket = ({
  jira,
  config,
  getCustomerInfo,
  isLegacyVersion,
  extractVersionComponents,
  getNextPatches
}) => {
  return async ({ ticket }) => {
    const {
      RELEASE,
      HOTFIX,
      RELEASEFIX
    } = config;
    try {
      let { key, versions, company, options } = ticket
      const { customers } = await getCustomerInfo();

      const genericBranch = "feature/" + key;
      const {
        gitMasterBranch,
        gitDevelopBranch,
        enQuestaVersion
      } = customers[company];

      versions = (versions.length > 0) ? versions : [enQuestaVersion];
      let gitBranches = [];

      if ( customers[company] !== undefined ){
        switch(options.type) {
          case RELEASE:
            break;
          case RELEASEFIX:
            break;
          case HOTFIX:
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

              // If it's a legacy cusomter, create the latest version branch anyways
              if ( isLegacyVersion(enQuestaVersion) ){
                gitBranches.push({
                  branch: genericBranch,
                  sourceBranch: gitDevelopBranch,
                  gitDevelopBranch,
                  gitMasterBranch
                });
              }

              // Switch break
              break;
            }
          default:
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

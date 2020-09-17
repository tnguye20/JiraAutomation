module.exports.makeGetTicketsFromReleaseRange = ({ getLog, findIssues }) => {
  return async (to, from) => {
    const ticketRegex = /(([A-Z]{2,})-\d{1,})/g;

    const response = await getLog({to, from});
    const { stdout, stderr, status } = response;
    if (stderr.length === 0){
      let matches = stdout.matchAll(ticketRegex);
      let tickets = {};
      const ticketsArr = [];
      matches = [...matches];
      matches.forEach(match => {
        const [ ticket ] = match;
        if (tickets[ticket] === undefined){
          tickets[ticket] = {};
          ticketsArr.push(ticket);
        }
      });
      let ticketsInfo = [];
      tickets = {};
      console.log("Number of Requests: ", ticketsArr.length);
      ticketsInfo = [...await findIssues(ticketsArr)];
      ticketsInfo.forEach( info => {
          let {
            fixVersions,
            issuetype,
            description,
            summary,
            issuelinks,
            versions
          } = info.fields
          fixVersions = fixVersions.map( fv => ( fv.name ) ).join(", ");
          versions = versions.map( v => ( v.name ) ).join(", ");

          if(issuetype.name !== "Release"){
            tickets[info.key] = {
              ticket: info.key,
              description,
              summary,
              fixVersions: fixVersions ,
              versions: versions,
              issuetype: issuetype.name
            }
            issuelinks.forEach(link => {
              if(link.outwardIssue !== undefined){
                tickets[info.key].outwardIssue = link.outwardIssue.key
              }
              if(link.inwardIssue !== undefined){
                tickets[info.key].inwardIssue = link.inwardIssue.key
              }
            });
        } else {
          // console.log(info.reason.options.uri);
        }
      });

      return tickets;
    }
    return {};
  }
}

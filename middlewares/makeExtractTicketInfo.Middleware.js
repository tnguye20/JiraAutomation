module.exports.makeExtractTicketInfo = ({ config }) => {
  return ( req, res, next ) => {
    const { fields, key } = req.body;
    const {
      COMPANY_KEY,
      SS_COMPANY,
      RELEASE,
      HOTFIX,
      RELEASEFIX
    } = config;

    const {
        priority,
        assignee,
        summary,
        versions,
        fixVersions,
        description
      } = fields;
    const options =  {
      type: ""
    }
    if (priority.name === config.SHOWSTOPPER) options.type = config.HOTFIX;

    req.ticket = {
        key,
        priority: priority.name,
        assignee,
        summary,
        versions: versions.map( _v => _v.name ),
        fixVersions: fixVersions.map( _f => _f.name ),
        description,
        company: fields[COMPANY_KEY] !== undefined ? fields[COMPANY_KEY].value : SS_COMPANY,
        options
    };
    next();
  }
}

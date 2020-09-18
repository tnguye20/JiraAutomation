module.exports.makeGetLog = ({ exec, config }) => {
  return async ({
    to,
    from="HEAD"
  }) => {
    const response = await exec({ cmd: `git log --format=format:%s ${to}...${from}` , options:{ cwd: config.REPO_DIR} })
    return response;
  }
}

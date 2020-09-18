module.exports.makeGetNextRelease = ( { exec, config } ) => {
  return async ({ version="HEAD" }) => {
    console.log(version);
    const cmd = `git show ${version}:./application.properties | grep -Po "(?<=next-version=)(.*)"`;
    const response = await exec({ cmd , options:{ cwd: config.REPO_DIR} })
    const { stdout } = response;
    return stdout.replace("\n", "");
  }
}

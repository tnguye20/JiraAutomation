const { exec } = require("./exec");
const { config } = require("../config");

module.exports.updateGitTags = async () => {
  const cmd = `git tag -l | xargs git tag -d; git fetch; git fetch --tags`;
  const response = await exec(cmd, {
    cwd: config.REPO_DIR
  });
  if (response.status !== 0){
    throw new Error("Can't update git tags");
  }
}

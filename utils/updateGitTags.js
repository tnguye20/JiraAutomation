const { exec } = require("./exec");
const config = require("../config");

const updateGitTags = async () => {
  const cmd = `git tag -l | xargs git tag -d; git fetch; git fetch --tags`;
  const response = await exec({cmd, options: {
    cwd: config.REPO_DIR,
    suppress: true
  }});
  console.log(response);
}

module.exports = {
  updateGitTags
}

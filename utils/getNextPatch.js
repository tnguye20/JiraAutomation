const { exec } = require('./exec');
const { config } = require('../config');
const { extractVersionComponents } = require('./extractVersionComponents');

const getNextPatch = async ( version ) => {
  const _v = extractVersionComponents(version);
  const { mainVersion, subVersion } = _v;
  if ( mainVersion === undefined ) throw new Error("Invalid Version Format");
  const cmd = `git tag -l | grep  -iPo '(?<=${mainVersion}\.${subVersion}\.).+' | sort -n -r | head -1`;
  const response = await exec({
    cmd,
    options: {
      cwd: "/home/tnguye20/repo/enquesta"
    }
  });
  let { status, stdout } = response;
  if ( code !== 0 ) throw new Error("Can't retrieve latest patch");
  return stdout;
}

module.exports = {
  getNextPatch
}

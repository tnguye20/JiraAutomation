const { updateGitTags } = require('./updateGitTags');
const { extractVersionComponents } = require('./extractVersionComponents');
const { isLegacyVersion } = require('./isLegacyVersion');

const getNextRelease = ( version ) => {
  updateGitTags();
  const _v = extractVersionComponents(version);
  const { mainVersion, subVersion } = _v;
  if ( mainVersion === undefined ) throw new Error("Invalid Version Format");
  const newSubVersion = (Number(subVersion) + 1).toString();
  console.log(mainVersion, subVersion);
  if ( isLegacyVersion(version) ){
    while(newSubVersion.length < 5){
      newSubVersion = "0" + newSubVersion;
    }
  }
  return mainVersion + "." + newSubVersion + ".0"
}

module.exports = {
  getNextRelease
}

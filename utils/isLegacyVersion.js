const { extractVersionComponents } = require("./extractVersionComponents");

module.exports.isLegacyVersion = (version) => {
  const result = extractVersionComponents(version);
  const { subVersion } = result;
  if (subVersion === undefined) return false;
  if (subVersion.length >= 5){
    return true;
  } else {
    return false;
  }
}

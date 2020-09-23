const { extractVersionComponents } = require("./extractVersionComponents");

module.exports.isLegacyVersion = (version) => {
  const result = extractVersionComponents(version);
  if ( Object.keys(result).length === 4 ){
    const { subVersion } = result;
    if (subVersion === undefined) return false;
    if (subVersion.length >= 5){
      return true;
    } else {
      return false;
    }
  }
  return false;
}

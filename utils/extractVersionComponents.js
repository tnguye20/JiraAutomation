module.exports.extractVersionComponents = ( version ) => {
  const versionPattern = /(\d+)\.(\d+)(\.\d+|\-rc)/g;
  versionPattern.lastIndex = 0
  const [ fullVersion, mainVersion, subVersion, patchVersion ] = versionPattern.exec(version);
  return {
    fullVersion,
    mainVersion,
    subVersion,
    patchVersion: patchVersion.replace(".", "")
  }
}

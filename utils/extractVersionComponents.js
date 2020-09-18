module.exports.extractVersionComponents = ( version ) => {
  const versionPattern = /(\d+)\.(\d+)(\.\d+|\-rc)/g;
  versionPattern.lastIndex = 0
  try {
    const [ fullVersion, mainVersion, subVersion, patchVersion ] = versionPattern.exec(version);
    return {
      fullVersion,
      mainVersion,
      subVersion,
      patchVersion: patchVersion.replace(".", "")
    }
  } catch (err) {
    return {};
  }
}

const { getNextPatch } = require('./getNextPatch');

module.exports.getNextPatches = async (versions) => {
  const promises = [];
  versions.forEach(version => {
    promises.push(getNextPatch(version));
  });
  const response = await Promise.all(promises);
  return response;
}

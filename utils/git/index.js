const config = require('../../config');
const { exec } = require('../exec');
const { makeGetLog } = require("./makeGetLog");

const getLog = makeGetLog({ exec, config });

module.exports = {
  getLog
}

const { makeExtractTicketInfo } = require('./makeExtractTicketInfo.Middleware');
const config = require('../config');

const extractTicketInfo = makeExtractTicketInfo({ config });

module.exports = {
  extractTicketInfo
}

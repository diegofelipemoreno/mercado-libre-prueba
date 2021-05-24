const CONSTANTS = require('../constants.js'); 
const apiRequestService	= require('../apiRequestService.js'); 

exports.search = (req, res) => {
  const endPointUrl =
    `${CONSTANTS.API.DOMAIN_END_POINT}${CONSTANTS.API.SEARCH_END_POINT}${req.query.q}`;

    apiRequestService.makeRequest(res, endPointUrl, (body) => {
    res.send({
      ...CONSTANTS.API.AUTHOR,
      items: body.results
    });
  });
};
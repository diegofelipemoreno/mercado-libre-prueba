const CONSTANTS = require('../constants.js'); 
const apiRequestService	= require('../apiRequestService.js'); 

exports.getItem = (req, res) => {
  const endPointUrl =
    `${CONSTANTS.API.DOMAIN_END_POINT}${CONSTANTS.API.ITEM_END_POINT}${req.params.id}/${CONSTANTS.API.DESCRIPTION_END_POINT}`;

    apiRequestService.makeRequest(res, endPointUrl, (body) => {
    res.send({
      ...CONSTANTS.API.AUTHOR,
      item: body
    });
  });
};
const CONSTANTS = require('../constants.js'); 
const apiRequestService	= require('../apiRequestService.js'); 

exports.getCategoryData = (req, res) => {
  const endPointUrl =
    `${CONSTANTS.API.DOMAIN_END_POINT}${CONSTANTS.API.CATEGORY_END_POINT}${req.params.id}`;

    apiRequestService.makeRequest(res, endPointUrl, (body) => {
    res.send({
      ...CONSTANTS.API.AUTHOR,
      categories: body
    });
  });
};
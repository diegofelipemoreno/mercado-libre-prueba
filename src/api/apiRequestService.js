const request	= require('request'); 
const utils = require('./utils.js');

/**
 * API Request Service.
 */
class ApiRequestService {
  /**
   * Makes the request on the DB.
   * @param {!Object} res Request response object.
   * @param {string} endPointUrl Endpoint URL to request.
   * @param {!Function} callback Request response callback.
   */
  makeRequest(res, endPointUrl, callback) {
    endPointUrl = utils.removeNonAsciiChar(endPointUrl);

    try {
      request({
        url: endPointUrl,
        json: true
      }, (error, response, body) => {

        if (error || !response) {
          res.send(REQUEST_ERROR.default);
        }

        if (response.statusCode === 404) {
          res.send(REQUEST_ERROR.CODE_404);
        }

        if (response.statusCode === 200) {
          callback(body);
        }
      });
    } catch (error) {
      res.send(error, REQUEST_ERROR.CODE_500);
    }
  }
}

/**
 * Constants.
 * @enum {Object}
 */
const REQUEST_ERROR = {
  CODE_404: {
    code: 404,
    description: 'Error 404'
  },
  CODE_500: {
    code: 500,
    description: 'Error 500'
  },
  default: {
    description: 'Something went wrong, Please try again.'
  }
}


module.exports = new ApiRequestService();
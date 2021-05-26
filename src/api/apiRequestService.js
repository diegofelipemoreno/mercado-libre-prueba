const request	= require('request'); 
const utils = require('./utils.js');

/**
 * API Request Service.
 */
class ApiRequestService {
  /**
   * Makes the request on the DB.
   * @param {!Object} res Request response object.
   * @param {!Object} endPointDict Endpoint URL to request dict.
   * @param {!Function} callback Request response callback.
   */
  async makeRequest(res, endPointDict, callback) {
    const getDataFromRequest = (endPointDict) => {
      const bodyData = {};

      return Promise.all(Object.keys(endPointDict).map((key) => {
        const url = endPointDict[key];

        return new Promise((resolve) => {
          const urlFiltered = utils.removeNonAsciiChar(url);
        
          request({
            url: urlFiltered,
            json: true
          }, (error, response, body) => {
            const responseOk = response.statusCode === 200;

            if (error || !response) {
              res.send(REQUEST_ERROR.default);
            }
    
            if (responseOk) {
              bodyData[key] = body;
            }

            resolve(bodyData);
          });
        });
      }));
    }

    try {
      const dataFromRequest = await getDataFromRequest(endPointDict);

      callback(...dataFromRequest);

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
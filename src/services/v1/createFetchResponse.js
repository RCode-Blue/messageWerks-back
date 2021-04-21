/**
 * @description Generates json response
 *
 * @module
 * @name createFetchResponse
 *
 * @param {boolean} err - Indicates if en error has occured
 * @param {object} found - Documents returned by query
 * @param {object} errDetails - Details of error, if any
 *
 * @returns {object} result
 * @property result.err
 * @property result.docs
 * @property result.details
 */

const createFetchResponse = (err = null, found = null, errDetails = null) => {
  let result = {
    err,
    docs: found,
  };

  // If error
  if (err) {
    result.err = {
      err,
      details: errDetails,
    };
  }

  // If results are returned
  else if (found) {
    if (found.length === 0) {
      result.docs = null;
      result.err = true;
    } else {
      result.docs = found;
      result.err = false;
    }
  }

  // `!found.length` - single item (eg: findById())
  else {
    result.docs = found;
    result.err = false;
  }

  return result;
};

module.exports = createFetchResponse;

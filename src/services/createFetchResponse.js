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

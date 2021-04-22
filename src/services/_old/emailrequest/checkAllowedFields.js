const checkAllowedFields = (data, allowedFields) => {
  let allowed = 0;
  let childObjs = data.children;
  childObjs.forEach((elem) => {
    if (allowedFields.includes(elem)) {
      allowed++;
    }
  });

  return (allowed = data.length ? true : false);
};

module.exports = checkAllowedFields;

const checkPrincipal = async (socialMedia) => {
  let socialMediaErrs = [];
  let updates = [...Array(socialMedia.length).keys()];
  let errors = [];

  const updateResults = (index, err) => {
    errors.push(index);
    socialMediaErrs.push(err);
  };

  updates.forEach((i) => {
    // No socialMedia
    if (!socialMedia[i].principal) {
      // console.log(i, ": No Principal");
      err = {
        index: i,
        message: "bad data",
        media: socialMedia[i].media,
        socialMediaId: socialMedia[i].userid,
      };
      updateResults(i, err);
      return;
    }

    // No account details
    if (
      ("businessAccount" in socialMedia[i].principal &&
        !socialMedia[i].principal.businessAccount) ||
      ("userAccount" in socialMedia[i].principal &&
        !socialMedia[i].principal.userAccount)
    ) {
      // console.log(i, ": missing account");
      err = {
        index: i,
        message: "missing user or business account information",
        media: socialMedia[i].media,
        socialMediaId: socialMedia[i].userid,
        principal: socialMedia[i].principal,
      };
      updateResults(i, err);
      return;
    }

    // Too many or few principals
    if (Object.keys(socialMedia[i].principal).length !== 1) {
      // console.log(i, ": wrong length");
      err = {
        index: i,
        message: "missing or bad user or business account information",
        media: socialMedia[i].media,
        socialMediaId: socialMedia[i].userid,
        principal: socialMedia[i].principal,
      };
      updateResults(i, err);
      return;
    }
  });

  errors.forEach((i) => {
    updates = updates.filter((item) => {
      return i !== item;
    });
  });

  return { updates, errors, socialMediaErrs };
};

module.exports = checkPrincipal;

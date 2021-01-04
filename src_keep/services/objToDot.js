function objToDot(obj, target, prefix) {
  target = target || {};
  prefix = prefix || "";

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      objToDot(obj[key], target, prefix + key + ".");
    } else {
      return (target[prefix + key] = obj[key]);
    }
  });
  return target;
}

module.exports = objToDot;

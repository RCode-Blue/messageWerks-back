const checkDups = (arr) => {
  let dups = [];
  for (i = 0; i < arr.length; i++) {
    let dup = [];
    dup.push(i);
    for (j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        dup.push(j);
      }
    }
    if (dup.length > 1) {
      dups.push(dup);
    }
  }
  return dups;
};

module.exports = checkDups;

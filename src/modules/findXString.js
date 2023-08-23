function findAString(commonString, aString, stopString) {
  let _aString, stopIndex;
  let index = commonString.siteString.indexOf(aString);
  if (index === -1) {
    return false;
  } else {
    commonString.siteString = commonString.siteString.slice(
      index + aString.length,
      commonString.siteString.length
    );
    stopIndex = commonString.siteString.indexOf(stopString);
    if (index === -1) {
      console.log("cant find end");
      return false;
    } else {
      _aString = commonString.siteString.slice(0, stopIndex);
      commonString.siteString = commonString.siteString.slice(
        stopIndex + 1,
        commonString.siteString.length
      );
      return _aString;
    }
  }
}

module.exports = findAString;

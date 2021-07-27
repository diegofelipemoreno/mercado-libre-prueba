/**
 * Remove non-ascii characters in a string.
 * @param {string} query URL to escape.
 * @return {string}
 */
 const removeNonAsciiChar = (query) => {
  const nonAsciiRegex =
    /[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g;

  return query.replace(nonAsciiRegex, '');
}

module.exports = removeNonAsciiChar;
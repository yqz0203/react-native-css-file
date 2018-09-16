/**
 * api
 */

function render(str, data = {}) {
  try {
    Object.keys(data).forEach((key) => {
      let value = data[key];

      if (typeof value === 'string') {
        value = `"${value}"`;
      }

      str = str.replace(new RegExp(`"${key}"(?=,|\n|\r\n)`, 'g'), value);
    });

    return JSON.parse(str);
  } catch (e) {
    console.warn('Generate styles failed.\n', e.stack);
  }
}

module.exports = {
  render,
};
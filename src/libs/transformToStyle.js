

// 其他颜色无法判断
// const colorRegex = /^(rgba?|#|hsl)/i;

const isNumber = (val) => !isNaN(Number(val));

const isNumberValue = (val) => isNumber(val);

const tryConvertNumber = (val = '') => {
  val = val.replace(/px/gi, '');
  return isNumber(val) ? Number(val) : val;
};

/**
 * css命名转rn命名
 * @param {string} name - css名称
 */
function css2RNName(name) {
  return name.split('-').map((item, i) => {
    if (i === 0) return item;
    return item[0].toUpperCase() + item.slice(1);
  }).join('');
}

/**
 * 转换border
 * @param {string} value - border值
 * @param {left|right|bottom|top} direction - border方向
 */
function handleBorder(key, value) {
  value = value.replace(/px/gi, '');

  if (key === 'border'
    || key === 'borderTop'
    || key === 'borderBottom'
    || key === 'borderLeft'
    || key === 'borderRight') {

    if (isNumberValue(value)) {
      return {
        [`${key}Width`]: tryConvertNumber(value),
      };
    }

    const valueArr = value.split(/\s+/g);
    const styles = {};

    valueArr.map((val) => {
      if (isNumberValue(val)) {
        val = tryConvertNumber(val);
        styles[`${key}Width`] = val;
      } else if (['hidden', 'initial', 'none', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'].includes(val)) {
        // styles[`${key}Style`] = val; // rn不支持borderTopStyle这种
        styles['borderStyle'] = val;
      } else {
        styles[`${key}Color`] = val;
      }
    });
    return styles;
  }

  return { [key]: tryConvertNumber(value) };
}

/**
 * 转换margin或者padding
 * @param {string} key 
 * @param {string|string[]} value 
 */
function handleMarginOrPadding(key, value) {
  value = value.replace(/px/gi, '');

  if (key === 'margin' || key === 'padding') {

    const valueArr = value.split(/\s+/g).filter(item => item !== '');

    if (valueArr.length === 1) {
      return {
        [key]: tryConvertNumber(valueArr[0]),
      };
    } else if (valueArr.length === 2) {
      return {
        [`${key}Vertical`]: tryConvertNumber(valueArr[0]),
        [`${key}Horizontal`]: tryConvertNumber(valueArr[1]),
      };
    } else {
      const obj = {
        [`${key}Top`]: tryConvertNumber(valueArr[0]),
        [`${key}Right`]: tryConvertNumber(valueArr[1]),
        [`${key}Bottom`]: tryConvertNumber(valueArr[2]),

      };

      if (valueArr.length === 4) {
        obj[`${key}Left`] = tryConvertNumber(valueArr[3]);
      }

      return obj;
    }
  }

  return { [key]: tryConvertNumber(value) };
}

/**
 * 转换transform属性
 */
function handleTransform(value) {
  /**
   * FIXME: 正向前瞻和非捕获匹配组无效
   */
  let valueArr = value.split(/\)\s+/);

  valueArr = valueArr.map((val, index) => {
    val.trim();
    if (index !== valueArr.length - 1) {
      val += ')';
    }
    return val;
  });

  let attrArr = [];
  valueArr.some(val => {
    const matched = val.match(/(\w+)\((.*)\)/);

    if (matched === null) {
      attrArr = val;
      return true;
    }

    const key = matched[1];
    val = matched[2];

    if (key === 'translate3d') {
      const val3d = val.split(/,/).map(val => val.trim());
      attrArr.push({
        translateX: tryConvertNumber(val3d[0]),
        translateY: tryConvertNumber(val3d[1]),
        translateZ: tryConvertNumber(val3d[2]),
      });
    } else {
      attrArr.push({
        [key]: tryConvertNumber(val),
      });
    }
  });

  return { transform: attrArr };
}

function transformStyles(tree) {
  const styles = {};

  // 目前只有一级
  tree.children.forEach(child => {
    if (child.type === 'scope') {
      let childStyles = {};
      child.children.forEach((subChild) => {
        const attr = css2RNName(subChild.value[0]);
        const value = css2RNName(subChild.value[1]);

        // 转换border
        if (/^border/.test(attr)) {
          childStyles = Object.assign(childStyles, handleBorder(attr, value));
        } else if (/^margin|padding/.test(attr)) {
          childStyles = Object.assign(childStyles, handleMarginOrPadding(attr, value));
        } else if (attr === 'transform') {
          childStyles = Object.assign(childStyles, handleTransform(value));
        } else {
          childStyles[attr] = tryConvertNumber(value);
        }
      });

      styles[css2RNName(child.value)] = childStyles;
    }
  });

  return styles;
}

module.exports = transformStyles;
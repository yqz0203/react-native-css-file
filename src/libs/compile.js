/**
 * 编译
 */

function Token(value, line, column) {
  this.value = value;
  this.line = line;
  this.column = column;
}

function genTokens(content) {
  const tokens = [];
  const l = content.length;
  let index = 0;
  let line = 1;
  let column = 0;

  while (index < l) {
    const t = content[index];
    index++;
    column++;

    tokens.push(new Token(t, line, column));

    if (t === '\n' || t === '\r\n') {
      line++;
      column = 0;
    }
  }

  return tokens;
}

/**
 * 编译
 */
function compile(str) {
  const tokens = genTokens(str);

  const tree = {
    type: 'root',
    children: [],
  };

  for (let i = 0, l = tokens.length; i < l;) {
    const token = tokens[i];

    if (token.value === '/' && tokens[i + 1].value === '*') {
      i = buildComment(i + 2);
      continue;
    }

    if (!/[\s|.]/.test(token.value)) {
      throwErr(token);
    }

    if (token.value === '.') {
      const nextIndex = buildScope(i + 1, tree);
      i = nextIndex;
      continue;
    }
    i++;
  }

  return tree;

  function throwErr(token) {
    if (!token) {
      throw new RangeError('Compile out of range, please check your cssfile');
    }

    const { value, column, line } = token;

    throw new TypeError(`Unexpected token ${JSON.stringify(value)} at line: ${line}, column: ${column}`);
  }

  // 作用域
  function buildScope(index, parentNode) {
    const node = {
      type: 'scope',
      value: '',
      children: [],
    };

    let tempStr = '';
    let i = index;
    while (true) {
      const token = tokens[i];

      if (!token) {
        i--;
        break;
      }

      if (token.value === '/' && tokens[i + 1].value === '*') {
        i = buildComment(i + 2);
        continue;
      }

      const { value } = token;

      if (tempStr === '' && !/[a-z\- ]/i.test(value)
        || tempStr !== '' && !/[a-z\-{ ]/i.test(value)) {
        throwErr(token);
      }

      if (value === '{') {
        node.value = tempStr;
        i = buildAttribute(i + 1, node);
        // 没有闭合
        if (tokens[i].value !== '}') {
          throwErr(tokens[i]);
        }
        i++;
        break;
      }

      if (value !== ' ') {
        tempStr += value;
      }
      i++;
    }

    parentNode.children.push(node);

    return i;
  }

  // 属性
  function buildAttribute(index, parentNode) {
    let tempKey = '';
    let tempValue = '';
    let pairs = ['', ''];
    let i = index;

    while (true) {
      const token = tokens[i];

      if (!token) {
        i--;        
        break;
      }

      if (token.value === '/' && tokens[i + 1].value === '*') {
        i = buildComment(i + 2);
        continue;
      }

      const { value } = token;


      if (/\r\n|\n/.test(value)) {
        if (tempKey || tempValue) {
          throwErr(token);
        }
        i++;
        continue;
      }

      if (value === '}') {
        break;
      }

      // 合法字符
      if (!/[a-z0-9:;,.\-#()% ]/i.test(value)) {
        throwErr(token);
      }

      // 起始字符必须是字符串
      if (tempKey === '' && !/[a-z0-9\- ]/i.test(value)) {
        throwErr(token);
      }

      if (value === ':') {
        pairs[0] = tempKey;
        i++;
        continue;
      }

      if (value === ';') {
        if (!tempValue || !tempValue) {
          throwErr(token);
        }

        pairs[1] = tempValue;
        parentNode.children.push({
          type: 'attribute',
          value: pairs,
        });
        tempKey = '';
        tempValue = '';
        pairs = [];
        i++;
        continue;
      }

      if (!pairs[0]) {
        if (value !== ' ') {
          tempKey += value;
        }
      } else {
        if (tempValue || value !== ' ') {
          tempValue += value;
        }
      }

      i++;
    }

    return i;
  }

  // 注释
  function buildComment(index) {
    let i = index;
    while (true) {
      const token = tokens[i];

      // 注释越界不抛异常
      if (!token) {
        i--;
        break;
      }

      if (token.value === '*' && tokens[i + 1].value === '/') {
        i = i + 2;
        break;
      }

      i++;
    }
    return i + 1;
  }
}


module.exports = compile;


# react-native-css-file

🚄🚄使用css文件书写react-native的样式

按照官方写法

``` javascript
let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
```
___
使用css文件来实现

``` css
/**
 * global.css
 */

.container {
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #F5FCFF;
}

.welcome {
    font-size: 20;
    text-align: center;
    margin: 10;
}

.instructions{
    text-align: center;
    color: #333;
    margin-bottom: 5;
}
```

``` javascript
const styles = require('./styles/global').build();
```

## 特性

- 支持类选择器
- 支持css简写，例如`transform: rotate(60deg) scale(1.2)`，`margin: 3px 3px;`，`border: solid 1px #ccc`等
- css注释
- 错误信息跟踪
- 自定义变量
- 🚫 派生选择器（考虑实现）

## 安装

`npm install react-native-css-file`

## 使用

首先，在项目的任何地方创建一个css文件。例如在`Header`组件中创建一个headerStyles.css文件

```fs
- Header
  - Header.js
  - headerStyles.css

```

``` css
/* headerStyles.css */

.container {
  flex: 1;
  backgroundColor: #fff;
}

.icon {
  border: solid 1px #fff;
  pading: 3px 5px;
}
```

在`package.json`中添加一个命令

``` javascript
"css": "rncss ./ --watch",
"css-build": "rncss ./",
```

然后运行 `npm run css`，会自动生成一个`headerStyles.js`文件（注意不要手动更改它）。

然后像以往那样使用css。

``` javascript
// Header.js

const styles = require('./headerStyles').build();

// ...
render() {
  return (
    <View style={styles.container}>
       <View style={styles.Icon} />
    </View>
  );
}

// ...

```

## 变量

因为在RN开发过程中经常需要动态的初始化样式，例如通过`Dimensions`来获取窗口大小然后设置高宽。为了在css中实现这样效果，这里提供了变量支持。

``` css
/* header.css*/
.icon {
  height: iconHeight;
  width: iconWidth;
}

.border {
  height: hariline;
}
```

在调用`build`方法时传入你想要设置的值

``` javascript
  require('./headerStyles').build({
    iconHeight: 30,
    iconWidth: 60,
  });
```

预制的变量有:

- hairline StylesSheet.hairlineWidth

## 示例

``` bash
 git clone https://github.com/yqz0203/react-native-css-file.git`

 cd ./react-native-css-file/example

 yarn

 npm run css

 react-native run-ios
```

**注意必须使用yarn安装**

## 问题

项目初期不可避免有功能缺失以及BUG，欢迎大家提出issue和共同维护。

## License

MIT

/**
 * This file is auto generated by react-native-trans-css
 * Please don't change any content
 */

const { StyleSheet } =  require('react-native');
const transCss =  require('react-native-trans-css');

const styleStr = `{
  "container": {
    "flex": 1,
    "justifyContent": "center",
    "alignItems": "center",
    "backgroundColor": "#F5FCFF"
  },
  "welcome": {
    "fontSize": 20,
    "textAlign": "center",
    "margin": 10
  },
  "instructions": {
    "textAlign": "center",
    "color": "#333",
    "marginBottom": 5
  },
  "myInfo": {
    "color": "red",
    "fontSize": 40
  },
  "circle": {
    "height": 80,
    "width": 80,
    "borderStyle": "solid",
    "borderWidth": 1,
    "borderColor": "red",
    "borderRadius": 40,
    "backgroundColor": "aqua"
  },
  "support": {
    "height": "100%",
    "borderStyle": "dashed",
    "borderColor": "#fff",
    "borderTopWidth": 3,
    "borderTopColor": "#fff",
    "borderBottomWidth": 1,
    "margin": 3,
    "marginVertical": 3,
    "marginHorizontal": 5,
    "marginTop": 30,
    "marginRight": 5,
    "marginBottom": 5,
    "marginLeft": 5,
    "padding": 3,
    "paddingVertical": 3,
    "paddingHorizontal": 5,
    "paddingTop": 3,
    "paddingRight": 5,
    "paddingBottom": 5,
    "paddingLeft": 5,
    "borderWidth": 3,
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0,
    "flex": 1,
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center",
    "alignSelf": "center",
    "textAlign": "center",
    "transform": [
      {
        "translateX": 2,
        "translateY": 3,
        "translateZ": 5
      },
      {
        "rotate": "30deg"
      }
    ]
  }
}`;

const build = (data) => {
  const _data = Object.assign({ hairlineWidth: StyleSheet.hairlineWidth }, data);
  return StyleSheet.create(transCss.render(styleStr, _data));
};

module.exports = {
  build,
};
    
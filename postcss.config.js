module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport":{
      viewportWidth: 375,//视图的宽度，对应的是设计稿
      viewportHeight: 667,//视图高度,对应的是设计稿的高度
      unitPrecision: 5,//指定'px'转换为视窗单位值的小数位数
      viewportUnit: 'vw',//指定转换为视窗单位,建议使用vw
      selectorBlackList: ['ignore'],//指定不需要转换的类
      minPixelValue: 1,//小于或者等于1px不转换为视窗单位
      mediaQuery: false,//允许媒体查询中转换为'px'
    }
  }
}

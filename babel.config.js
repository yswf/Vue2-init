// 这是项目发布阶段需要用到babel插件
const prodPlugins = [];
if (process.env.NODE_ENV === "production") {
  prodPlugins.push("transform-remove-console");
}
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
    ...prodPlugins,
    "@babel/plugin-syntax-dynamic-import",
  ],
};

// 解决老旧浏览器兼容方法
// https://blog.csdn.net/qq_38188485/article/details/117049154

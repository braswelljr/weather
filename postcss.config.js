module.exports = {
  plugins: [
    require("tailwindcss"),
    //require("autoprefixer")({ grid: "autoplace" }),
    require("cssnano")({ preset: "default" })
  ]
};

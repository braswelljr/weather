module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    process.env.NODE_ENV === "development"
      ? require("cssnano")({ preset: "default" })
      : false
  ]
};

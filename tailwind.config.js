module.exports = {
  purge: {
    mode: "all",
    enabled: true,
    content: ["./src/**/*.vue", "./public/index.html"],
    preserveHtmlElements: true
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  theme: {
    extend: {
      spacing: theme => ({
        "72": "18rem",
        "80": "20rem",
        "96": "24rem",
        "102": "28rem",
        "128": "32rem",
        "144": "36rem",
        "160": "40rem",
        "192": "48rem",
        "204": "56rem"
      })
    },
    fontFamily: {},
    zIndex: {
      auto: "auto",
      "0": "0",
      "10": "10",
      "20": "20",
      "30": "30",
      "40": "40",
      "50": "50",
      "60": "60",
      "70": "70",
      "80": "80",
      "90": "90",
      "100": "100",
      "-10": "-10",
      "-20": "-20",
      "-30": "-30",
      "-40": "-40",
      "-50": "-50",
      "-60": "-60",
      "-70": "-70",
      "-80": "-80",
      "-90": "-90",
      "-100": "-100"
    }
  },
  variants: {
    accessibility: ["responsive", "focus", "hover", "active"],
    borderStyle: ["responsive", "hover", "active", "group-hover"],
    divideStyle: ["responsive", "hover", "focus", "active", "group-hover"],
    gradientColorStops: [
      "responsive",
      "hover",
      "focus",
      "active",
      "group-hover"
    ],
    height: ["responsive", "hover", "focus"],
    outLine: ["responsive", "hover", "focus", "active"],
    width: ["responsive", "hover", "focus", "active"],
    zIndex: ["responsive", "hover", "focus"]
  },
  plugins: [
    require("tailwindcss-debug-screens"),
    require("tailwindcss-flexbox-order")()
  ]
};

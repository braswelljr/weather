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
    extend: {},
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
    borderStyle: ["responsive", "hover", "active", "group-hover"],
    divideStyle: ["responsive", "hover", "focus", "active", "group-hover"],
    gradientColorStops: [
      "responsive",
      "hover",
      "focus",
      "active",
      "group-hover"
    ],
    outLine: ["responsive", "hover", "focus", "active"],
    width: ["responsive", "hover", "focus", "active"],
    zIndex: ["responsive", "hover", "focus"]
  },
  plugins: []
};

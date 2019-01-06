module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 3,
      viewportUnit: "vw",
      selectorBlackList: [
        ".ignore",
        ".hairlines",
        ".size-21",
        ".text",
        /__vev_calendar-wrapper/
      ],
      minPixelValue: 1,
      mediaQuery: false
    }
  }
};

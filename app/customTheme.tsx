import { createDarkTheme, createTheme } from "baseui"
const primitivesLightTheme = {
  // accent: "#F89FF3",
  // accent100: "#f08aeb",
  // accent200: "#e97fe4",
  // accent300: "#F45AEA",
  // accent400: "#F127E4",
  // accent500: "#B71DAD",
  // accent600: "#901788",
  // accent700: "#600F5B",
}
const overridesLightTheme = {
  // colors: {
  //   buttonSecondaryFill: primitivesLightTheme.accent100,
  //   buttonSecondaryText: primitivesLightTheme.accent100,
  //   buttonSecondaryHover: primitivesLightTheme.accent200,
  //   buttonSecondaryActive: primitivesLightTheme.accent300,
  //   buttonSecondarySelectedFill: primitivesLightTheme.accent200,
  //   buttonSecondarySelectedText: primitivesLightTheme.accent100,
  //   buttonSecondarySpinnerForeground: primitivesLightTheme.accent700,
  //   buttonSecondarySpinnerBackground: primitivesLightTheme.accent300,
  // },
}
const lightTheme = createTheme(primitivesLightTheme, overridesLightTheme)

// createDarkTheme ...

export { lightTheme }

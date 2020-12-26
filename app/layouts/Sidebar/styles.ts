import { styled } from "baseui"

export const PreviewHolder = styled("div", ({ $theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  }
})

export const SideNavHeadingWrapper = styled("div", ({ $theme }) => {
  return {
    margin: "8% 0% 0 5% ",
    fontFamily: $theme.typography.HeadingLarge.fontFamily,
    color: $theme.colors.white,
  }
})

export const NextSuggestionBox = styled("div", ({ $theme }) => {
  return {
    // margin: "20px 5px",
    // width: "30%",
    // textAlign: "center",
  }
})

export const ImageHolder = styled("div", ({ $theme }) => {
  return {}
})

export const PreviewImage = styled("img", ({ $theme }) => {
  return {
    verticalAlign: "middle",
    width: "100%",
    height: "100%",
    borderRadius: "30%",
  }
})

export const PreviewText = styled("p", ({ $theme }) => {
  return {
    fontSize: "0.9rem",
    height: "40px",
  }
})

PreviewText.displayName = "PreviewText"

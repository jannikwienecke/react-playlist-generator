import { styled } from "baseui"
import React from "react"

const Container = styled("div", ({ $theme }) => {
  console.log("$theme", $theme.colors.backgroundOverlayDark)
  return {
    backgroundColor: $theme.colors.white,
    // backgroundColor: "black",
    flexGrow: 1,
    borderRadius: "14px",
    padding: "2%",
  }
})

export default Container

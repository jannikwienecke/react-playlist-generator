import { styled } from "baseui"

const Container = styled("div", ({ $theme }) => {
  return {
    backgroundColor: $theme.colors.white,
    flexGrow: 1,
    borderRadius: "14px",
    padding: "2%",
  }
})

export default Container

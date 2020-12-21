import { styled } from "baseui"

const ContainerApp = styled("div", ({ $theme }) => {
  return {
    background: "linear-gradient(to right, #111111 66%, #151628 100%)",
    padding: "0.7%",
    display: "flex",
    height: "95vh",
    minHeight: "800px",
    margin: "1%",
    borderRadius: "16px",
  }
})

export default ContainerApp

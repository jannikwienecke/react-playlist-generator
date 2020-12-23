// import HeadingLink from "app/components/baseComponents/HeadingLink"
import { useStyletron } from "baseui"
import { ALIGN, StyledNavigationItem, StyledNavigationList } from "baseui/header-navigation"
import React from "react"
import { HeadingLink } from "app/components/baseComponents/LinkHeading"
import { useRouter } from "blitz"
import { Button } from "baseui/button"

const Navbar = () => {
  const { pathname } = useRouter()

  console.log("pathname", pathname)
  const [css] = useStyletron()
  return (
    <div className={css({ display: "flex", height: "10%" })}>
      <div
        className={css({
          flexGrow: 1,
          display: "flex",
        })}
      >
        <StyledNavigationList>
          <StyledNavigationItem>
            <img
              className={css({ marginRight: "50px" })}
              src={"/logo.png"}
              alt="logo"
              height="120px"
              width="120px"
            />
          </StyledNavigationItem>
          <StyledNavigationItem>
            <HeadingLink isSelected={pathname === "/"} href="/">
              <>Home</>
            </HeadingLink>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <HeadingLink isSelected={pathname === "/artist"} href="/artist">
              <>Artist</>
            </HeadingLink>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <HeadingLink isSelected={pathname === "/track"} href="/track">
              <>Track</>
            </HeadingLink>
          </StyledNavigationItem>
        </StyledNavigationList>
      </div>
      <div className={css({ display: "flex" })}>
        <StyledNavigationList>
          <StyledNavigationItem>
            {/* <Button>Get started</Button> */}
            <HeadingLink isSelected={pathname === "/track"} href="/track">
              <img src={"/logout.png"} alt="logout button" height="40px" width="40px" />
            </HeadingLink>
          </StyledNavigationItem>
        </StyledNavigationList>
      </div>
    </div>
  )
}

export default Navbar

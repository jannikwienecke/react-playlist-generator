import React from "react"
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation"
import { StyledLink } from "baseui/link"
import { Button } from "baseui/button"
import { Link } from "blitz"
const Navbar = () => {
  return (
    <nav>
      <HeaderNavigation>
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem>Playlist Generator</StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.center} />
        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem>
            <Link href="artist">
              <StyledLink>Artist</StyledLink>
            </Link>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <StyledLink>
              <Link href="track">
                <StyledLink>Tracks</StyledLink>
              </Link>
            </StyledLink>
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem>
            <Button>Get started</Button>
          </StyledNavigationItem>
        </StyledNavigationList>
      </HeaderNavigation>
    </nav>
  )
}

export default Navbar

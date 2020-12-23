import { useStyletron } from "baseui"
import { HeadingXSmall } from "baseui/typography"
import { Link } from "blitz"

interface HeadingLinkProps {
  isSelected: boolean
  // children: string
  href: string
}

export const HeadingLink: React.FC<HeadingLinkProps> = ({ href, isSelected = false, children }) => {
  const [css, theme] = useStyletron()

  const stylesSelected = {
    color: theme.colors.black,
    borderBottom: `2px solid ${theme.colors.primary500}`,
    textAlign: "center",
    width: "120px",
    paddingBottom: "30px",
  }

  const stylesNotSelected = {
    color: theme.colors.primary400,
    margin: 0,
    textAlign: "center",
    width: "120px",
    paddingBottom: "30px",
  }

  let styles = {}
  if (isSelected) styles = stylesSelected
  else styles = stylesNotSelected

  return (
    <span className={css({ cursor: "pointer" })}>
      <Link href={href}>
        <HeadingXSmall margin={0} $style={styles}>
          {children}
        </HeadingXSmall>
      </Link>
    </span>
  )
}

export default HeadingLink

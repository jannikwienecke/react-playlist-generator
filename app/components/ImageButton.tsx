import { useStyletron } from "baseui"
import { Button } from "baseui/button"

interface ImageButtonProps {
  onClick: () => void
  active: boolean
}

export const ImageButton: React.FC<ImageButtonProps> = ({ children, onClick, active }) => {
  const [css, theme] = useStyletron()
  return (
    <Button
      onClick={onClick}
      $style={{
        borderRadius: "30%",
        background: !active ? "rgba(84, 84, 84, 0.4)" : theme.colors.borderAccentLight,
        transition: "1s",
        ":hover": {
          background: !active ? "rgba(84, 84, 84, 0.9)" : theme.colors.borderAccentLight,
        },
        padding: !active ? "6px" : "3px",
      }}
      size="mini"
    >
      {children}
    </Button>
  )
}

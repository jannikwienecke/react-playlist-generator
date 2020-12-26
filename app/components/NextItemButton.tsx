import { Button } from "baseui/button"
import { ArrowRight } from "baseui/icon"

interface NextItemBtnProps {
  onClick: () => void
}

export const NextItemButton: React.FC<NextItemBtnProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      $style={{ marginLeft: "10px" }}
      kind="secondary"
      size="mini"
      shape="circle"
    >
      <ArrowRight size={36} title="next selection" />
    </Button>
  )
}

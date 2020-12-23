import { useStyletron } from "baseui"
import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const Wrapper = ({ children }) => {
  const [css] = useStyletron()
  return <div className={css({ textAlign: "center", margin: "10px" })}>={children}</div>
}

export const SideSkeleton = () => {
  return (
    <SkeletonTheme color="#202020" highlightColor="#444">
      <Skeleton width="80%" count={30} wrapper={Wrapper} />
    </SkeletonTheme>
  )
}

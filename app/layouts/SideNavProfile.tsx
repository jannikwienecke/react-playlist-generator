import { useStyletron } from "baseui"
import { HeadingXSmall } from "baseui/typography"
import React from "react"

// type PropsProfileImage = {
//   profileImageUrl: string,
//   profileName: string,
// }

export const ProfileImage = ({ profileName, profileImageUrl }) => {
  const [css, theme] = useStyletron()
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "flex-end",
        textAlign: "center",
      })}
    >
      <div>
        <img
          className={css({
            verticalAlign: "middle",
            width: "100px",
            height: "90px",
            borderRadius: "30%",
            boxShadow: "10px 0px 200px 100px rgba(59,40,77,1)",
          })}
          src={profileImageUrl}
          alt="spotify profile"
        />
      </div>
      <div className={css({ textAlign: "center" })}>
        <HeadingXSmall
          $style={{ fontSize: "1.1rem" }}
          margin={"10px"}
          color={theme.colors.primary400}
        >
          {profileName}
        </HeadingXSmall>
      </div>
    </div>
  )
}

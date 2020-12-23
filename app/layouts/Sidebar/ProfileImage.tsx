import { useStyletron } from "baseui"
import { HeadingXSmall } from "baseui/typography"
import React from "react"
import Skeleton from "react-loading-skeleton"

type PropsProfileImage = {
  profileImageUrl: string | undefined
  profileName: string | undefined
}

const ProfileImage: React.FC<PropsProfileImage> = ({ profileName, profileImageUrl }) => {
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
            backgroundColor: "white",
            verticalAlign: "middle",
            width: "100px",
            height: "90px",
            borderRadius: "30%",
            boxShadow: "10px 0px 200px 100px rgba(59,40,77,1)",
          })}
          src={profileImageUrl ? profileImageUrl : "/profile.png"}
          alt="spotify profile"
        />
      </div>
      <div className={css({ textAlign: "center" })}>
        <HeadingXSmall
          $style={{ fontSize: "1.1rem" }}
          margin={"10px"}
          color={theme.colors.primary400}
        >
          {profileName ? profileName : "Profile Name"}
        </HeadingXSmall>
      </div>
    </div>
  )
}

export default ProfileImage

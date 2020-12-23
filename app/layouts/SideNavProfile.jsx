import { useStyletron } from "baseui"
import { HeadingXSmall } from "baseui/typography"
import React from "react"
// const Flex =

const IMAGE_URL =
  "https://scontent.flux1-1.fna.fbcdn.net/v/t1.0-1/p320x320/19030232_10210123266779047_3022657193520404372_n.jpg?_nc_cat=100&cb=846ca55b-ee17756f&ccb=2&_nc_sid=0c64ff&_nc_ohc=rgstMfkhoF0AX8bnorl&_nc_ht=scontent.flux1-1.fna&tp=6&oh=1839002b65dc4b975d27fc0a74423d0a&oe=60079A75"
export const ProfileImage = () => {
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
          src={IMAGE_URL}
          alt="spotify profile"
        />
      </div>
      <div className={css({ textAlign: "center" })}>
        <HeadingXSmall
          $style={{ fontSize: "1.1rem" }}
          margin={"10px"}
          color={theme.colors.primary400}
        >
          Jannik Wienecke
        </HeadingXSmall>
      </div>
    </div>
  )
}

import { useMe } from "app/hooks/useMe"

const useProfileImage = () => {
  const { me, refetch } = useMe()

  let profileImageUrl = ""
  if (me?.images) {
    console.log("me...", me)
    profileImageUrl = me.images.length > 0 ? me.images[0].url : "/profile.png"
  }

  return { refetch, profileImageUrl, profileName: me?.display_name, ...me }
}

export default useProfileImage

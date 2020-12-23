import { useMe } from "app/hooks/useMe"

const useProfileImage = () => {
  const { me, refetch } = useMe()

  console.log("me", me)
  let profileImageUrl = ""
  if (me?.images) {
    profileImageUrl = me.images[0].url
  }

  return { refetch, profileImageUrl, profileName: me?.display_name, ...me }
}

export default useProfileImage
import { StoryContainer, WelcomePopup,DeletedRepliesPopup } from '../../components'

const AllStories =  ({ name, time, title, text }) => {
  return (
    <>
      <WelcomePopup/>
      <DeletedRepliesPopup/>
      <StoryContainer />
    </>
  )
}

export default AllStories

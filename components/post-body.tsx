import markdownStyles from './markdown-styles.module.css'
import PostBodyContainer from './post-body-container'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <PostBodyContainer>
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      </PostBodyContainer>
  )
}

export default PostBody

import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import Author from '../types/author'
import PostBodyContainer from './post-body-container'

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
}

const PostHeader = ({ title, coverImage, date, author }: Props) => {
  return (
    <>
    <PostBodyContainer>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:flex items-start md:mb-12">
        <Avatar {...author} />
      <div className="width-1/4 text-right text-sm font-bold text-gray-700"><DateFormatter dateString={date} /></div>

      </div>
    </PostBodyContainer>
      <div className="mb-8 md:mb-16 md:mt-20 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar {...author} />
        </div>
        <div className="md:hidden mb-6 text-lg text-gray-700">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}

export default PostHeader

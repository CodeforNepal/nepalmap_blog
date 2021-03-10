import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl md:pt-6 tracking-wide leading-tight mb-8 text-left">
      {children}
    </h1>
  )
}

export default PostTitle

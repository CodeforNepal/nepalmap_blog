import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { BLOG_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import PostType from '../../types/post'
import Breadcrumb from "../../components/breadcrumbs";
import { getBlogBySlugHelper } from '../../lib/helpers/blogs'
import { connectDatabase } from '../../middleware/database'
import { Author, BlogsAttr } from '../../lib/models'

type Props = {
  blog: BlogsAttr
  morePosts: PostType[]
  preview?: boolean
}

const Post = ({ blog, morePosts, preview }: Props) => {
  const router = useRouter()
  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
          <Breadcrumb
            items={[
              { title: "Home", url: "/" },
              { title: "Posts", url: `/` },
              { title: blog.title, url: `/blogs/${blog.slug}` },
            ]}
          />
            <article className="mb-32">
              <Head>
                <title>
                  {blog.title} | {BLOG_NAME}
                </title>
                <meta property="og:image" content={blog.banner} />
              </Head>
              <PostHeader
                title={blog.title}
                coverImage={blog.banner}
                date={blog.createdAt}
                author={blog.author}
              />
              <PostBody content={blog.contents} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getServerSideProps({ params }: Params) {
  const {slug} = params
  await connectDatabase()
  const blog: BlogsAttr & {_id:Object} = await getBlogBySlugHelper(slug as string).lean()
  console.log(blog,slug)
  if (!blog) {
    console.log("here")
    return {
      notFound: true,
    }
  }
  blog.contents = await markdownToHtml(blog.contents || '')
  blog._id = blog._id?.toString()
  blog.createdAt = new Date(blog.createdAt).toDateString()
  blog.updatedAt = new Date(blog.updatedAt).toDateString()
  const author: Author & {_id?:Object} = blog.author 
  author._id = author?._id?.toString()
  return {
    props: {
      blog:{...blog,author},
    },
  }
}
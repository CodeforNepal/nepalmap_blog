import { useRouter } from 'next/router'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { BLOG_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import PostType from '../../types/post'
import Breadcrumb from "../../components/breadcrumbs";
import { getBlogBySlugHelper } from '../../lib/helpers/blogs'
import { connectDatabase } from '../../middleware/database'
import { BlogsAttr } from '../../lib/models'

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
                <meta
        name="description"
        content={blog.excerpt}
      />
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
  const blog: BlogsAttr = await getBlogBySlugHelper(slug as string).lean()
  if (!blog) {
    return {
      notFound: true,
    }
  }
  blog.contents = await markdownToHtml(blog.contents || '')
  const string = JSON.stringify(blog)
  const serialized = JSON.parse(string)
  return {
    props: {
      blog:serialized,
    },
  }
}
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { BLOG_NAME } from '../lib/constants'
import Post from '../types/post'
import { getRecentBlogsHelper } from '../lib/helpers/blogs'
import { connectDatabase } from '../middleware/database'
import { BlogsAttr } from '../lib/models'

type Props = {
  recentBlogs: BlogsAttr[]
}

const Index = ({ recentBlogs }: Props) => {
  const heroPost = recentBlogs[0]
  const morePosts = recentBlogs.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>{BLOG_NAME}</title>
        </Head>
        <Container>
          {/* <Intro /> */}
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.banner}
              date={heroPost.createdAt}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getServerSideProps = async () => {
  await connectDatabase()
  const recentBlogs = await getRecentBlogsHelper()
  const stringBlogs = JSON.stringify(recentBlogs)
  return {
    props: { recentBlogs: JSON.parse(stringBlogs) },
  }
}

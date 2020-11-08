import Container from "../../components/container";
import Layout from "../../components/layout";
import Head from "next/head";
import { BLOG_NAME } from "../../lib/constants";
import PostBodyContainer from "../../components/post-body-container";
import PostTitle from "../../components/post-title";
import Breadcrumb from "../../components/breadcrumbs";
import { NepalMapLogoText } from "../../components/nepal-map-logo-text";
const About: React.FC = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>About {BLOG_NAME}</title>
        </Head>
        <Container>
          <Breadcrumb
            items={[
              { title: "Home", url: "/" },
              { title: "Posts", url: `/posts` },
            ]}
          />
          <PostTitle>Posts</PostTitle>
          <PostBodyContainer>
            Post Page
          </PostBodyContainer>
        </Container>
      </Layout>
    </>
  );
};

export default About;

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
              { title: "About", url: `/about` },
            ]}
          />
          <PostBodyContainer>
          <PostTitle>About</PostTitle>
            <NepalMapLogoText/> makes data on Nepal more accessible and understandable.
            NepalMap is of great use to journalists, students, academics and
            others who are interested in using data to learn about Nepal. This
            tool is a friendly and reliable resource for journalists who want to
            use data to tell stories or discover stories that are of public
            interest. NepalMap uses the National Data Profile, created by the
            Central Bureau of Statistics, and other official sources, to create
            user-friendly data visualizations on key demographic issues. You can
            embed, access or download the data too. You can also compare any two
            areas side-by-side. If you would like to access pre-federal data
            from 2011 Population Census, please check out: 2011.nepalmap.org.
            NepalMap is a project of Code for Nepal, a non-profit that works to
            increase digital literacy and the use of open data in Nepal. Please
            make a tax deductible donation to help us maintain the server space
            for NepalMap, and empower Nepal digitally! Shoulders of Giants Yes!
            NepalMap is based on Wazimap which is a fork of Census Reporter.
            Wazimap is built and maintained by Code for South Africa. Other
            implementations include Wazimap Kenya and Wazimap South Africa, the
            first Wazimap implementation. All of these tools are completely open
            source. You can build one for your country. NepalMap code is
            licensed under the MIT License. NepalMap branding is copyright of
            Code for Nepal and cannot be used without permission. Help us
            NepalMap is entirely built by volunteers who are committed to
            ensuring everyone has access to open data about Nepal. We need more
            help. We are looking for volunteers who can help us add more data,
            and improve NepalMap. If you have the right skills, and would like
            to help, please complete this form! Privacy Policy This website uses
            Google Analytics to help analyse how visitors use this site. Google
            Analytics uses “cookies”, which are small text files placed on your
            computer, to collect standard internet log information and visitor
            behaviour information in an anonymous form.
          </PostBodyContainer>
        </Container>
      </Layout>
    </>
  );
};

export default About;

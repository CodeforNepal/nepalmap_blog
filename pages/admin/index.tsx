import { Session } from "next-auth"
import { useSession, signIn } from "next-auth/client"
import { Form } from 'react-final-form'
import {FormApi} from 'final-form'
import { useEffect } from "react"
import { BlogsAttr } from "../../lib/models/blogs"
import { Input } from "../../components/final-form"
import { Button } from "../../components/base"

interface CustomSession extends Session {
  idToken?: string
}

type Blogs = Omit<BlogsAttr, 'author' | 'slug' | 'createdAt' | 'updatedAt'>

const initialValues: Blogs = {
  title: '',
  contents: '',
  banner: '',
  excerpt: '',
}

const postBlogs = async (values:Blogs) =>{
  const response = await fetch('/api/blogs',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
  if(response.ok){
    return response.json()
  }
  throw new Error("Failed to post")
}
const Index = () => {
  const [session, loading] = useSession()
  useEffect(() => {
    if (!session && !loading) {
      signIn('google')
    }
  }, [session, loading])

  const onSubmit = async (values: Blogs, formAPI: FormApi<Blogs,Blogs>) => {
      try{
        const resp = await postBlogs(values)
        setTimeout(()=>formAPI.reset(initialValues))
        console.log(resp)
      }catch(err){
        console.log(err)
      }
  }

  if (!session) {
    return <>Login to continue</>
  }

  return (
    <>
      <div className="flex items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="md:w-3/4 container mx-auto">
          <div className="mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
            <div className="text-center">
              <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Post Blog</h1>
              {/* <p className="text-gray-400 dark:text-gray-400"></p> */}
            </div>
            <Form
              onSubmit={onSubmit}
              initialValues={initialValues}
              render={(formProps) => {
                const { handleSubmit, pristine, submitting } = formProps
                return (
                  <form onSubmit={handleSubmit}>
                    <Input formProps={formProps} required name="title" type="text" label="Title" placeholder="Enter Tile for blog" />
                    <Input formProps={formProps} required name="banner" type="text" label="Banner" placeholder="Enter banner image link" />
                    <Input formProps={formProps} required name="excerpt" type="textarea" label="Excerpt" placeholder="Enter short summary" />
                    <Input formProps={formProps} required name="contents" type="markdown" label="Content" placeholder="Blog Description" />
                    <div className="mb-6">
                        <Button submitting={submitting} disabled={pristine || submitting} type="submit" >Save</Button>
                    </div>
                  </form>
                )
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  return {
    props: {},
  }
}

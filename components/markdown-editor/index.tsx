
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { useState } from 'react'
import markdownToHtml from '../../lib/markdownToHtml'
export interface MarkdownProps{
    name: string;
    value: string;
    handleChange: (name: any, value: string) => void;
}
const MarkdownEditor: React.FC<MarkdownProps> = ({ name, value, handleChange }) => {
  const [selectedTab, setSelectedTab] = useState<'write'|'preview'>('write')
  const save = async function * (data: any) {
    // Promise that waits for "time" milliseconds
    const wait = function (time: number) {
      return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), time)
      })
    }

    // Upload "data" to your server
    // Use XMLHttpRequest.send to send a FormData object containing
    // "data"
    // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

    await wait(2000)
    // yields the URL that should be inserted in the markdown
    yield ''
    await wait(2000)

    // returns true meaning that the save was successful
    return true
  }

  return (
        <ReactMde
          value={value}
          onChange={(updatedValue) => handleChange(name, updatedValue)}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(markdownToHtml(markdown))
          }
        //   loadSuggestions={loadSuggestions}
          childProps={{
            writeButton: {
              tabIndex: -1
            }
          }}
          paste={{
            saveImage: save
          }}
        />
  )
}

export default MarkdownEditor

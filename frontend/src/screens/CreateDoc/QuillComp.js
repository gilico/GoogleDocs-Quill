import React from 'react'
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import './TextEditorStyle.css'

const QuillComp = ({setContent, content}) => {
  return (
    <div className="quill-parent">
      <ReactQuill
      className='myQuill'
        placeholder="Write Your Content Here..."
        modules={modules}
        formats={formats}
        onChange={(e) => setContent(e)}
        value={content}
        direction="justify"
      />
    </div>
  )
}

const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ direction: ''}, { direction: 'rtl'}],
      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
      ["bold", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["code"],
    ]
}

const formats = [
    "header",
    "direction",
    "align",
    "bold",
    "underline",
    "list",
    "bullet",
    "indent",
    "code"
  ]

export default QuillComp
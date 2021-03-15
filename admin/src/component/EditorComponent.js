import React from 'react'
import { Editor } from '@tinymce/tinymce-react'

class EditorComponent extends React.Component {
  handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content)
  }

  render() {
    return (
      <Editor
        apiKey="awlfaezu5y4xg5bp5dpcfy1vmmop4jjhw73t36hys3why589"
        initialValue="<p></p>"
        init={{
          height: 300,
          menubar: 'insert',
          external_plugins: {
            tiny_mce_wiris:
              '../../node_modules/@wiris/mathtype-tinymce4/plugin.min.js',
          },
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry | help',
        }}
        onEditorChange={this.handleEditorChange}
      />
    )
  }
}

export default EditorComponent

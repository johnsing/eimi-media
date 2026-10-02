import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import styled from 'styled-components'
import { useState } from 'react'
import { Button } from '../common/Button'

const EditorWrapper = styled.div`
  .ProseMirror {
    min-height: 200px;
    padding: 16px;
    border: 2px solid #e6ecf0;
    border-radius: 12px;
    outline: none;
    font-size: 16px;
    line-height: 1.6;
    transition: border-color 0.2s ease;
    background: white;

    &:focus {
      border-color: #1da1f2;
      box-shadow: 0 0 0 3px rgba(29, 161, 242, 0.1);
    }

    p {
      margin: 0 0 8px 0;
    }

    h1, h2, h3 {
      margin: 16px 0 8px 0;
    }

    ul, ol {
      padding-left: 24px;
      margin: 8px 0;
    }

    blockquote {
      border-left: 4px solid #1da1f2;
      padding-left: 16px;
      margin: 8px 0;
      color: #657786;
    }

    code {
      background: #f5f8fa;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 14px;
    }

    pre {
      background: #14171a;
      color: white;
      padding: 12px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 8px 0;

      code {
        background: transparent;
        color: white;
        padding: 0;
      }
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 8px 0;
    }

    a {
      color: #1da1f2;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .ProseMirror-focused {
    border-color: #1da1f2;
  }
`

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 12px;
  padding: 8px;
  background: #f5f8fa;
  border-radius: 12px;
  border: 1px solid #e6ecf0;
`

const ToolbarButton = styled.button`
  padding: 6px 12px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: ${props => props.$active ? '#1da1f2' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#657786'};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${props => props.$active ? '600' : '400'};

  &:hover {
    background: ${props => props.$active ? '#1a91da' : '#e8f5fe'};
    color: ${props => props.$active ? 'white' : '#1da1f2'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const ImageInput = styled.input`
  display: none;
`

const ImageUploadButton = styled.label`
  padding: 6px 12px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: #657786;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e8f5fe;
    color: #1da1f2;
  }
`

const CharacterCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: ${props => props.$isNearLimit ? '#e0245e' : '#657786'};
  margin-top: 8px;
`

const TiptapEditor = ({ content, onChange, placeholder = 'Write something amazing...' }) => {
  const [charCount, setCharCount] = useState(0)
  const maxLength = 1000

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Placeholder.configure({
        placeholder: placeholder
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const text = editor.getText()
      setCharCount(text.length)
      if (onChange) {
        onChange(html)
      }
    },
    editorProps: {
      attributes: {
        class: 'ProseMirror',
      },
    },
  })

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const uploadImage = (event) => {
    const file = event.target.files[0]
    if (file && editor) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result
        if (typeof base64 === 'string') {
          editor.chain().focus().setImage({ src: base64 }).run()
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const setLink = () => {
    const url = window.prompt('Enter URL:')
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  if (!editor) {
    return null
  }

  const isNearLimit = charCount > maxLength * 0.8

  return (
    <div>
      <Toolbar>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          $active={editor.isActive('bold')}
        >
          <b>B</b>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          $active={editor.isActive('italic')}
        >
          <i>I</i>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          $active={editor.isActive('strike')}
        >
          <s>S</s>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          $active={editor.isActive('code')}
        >
          {'<>'}
        </ToolbarButton>
        
        <span style={{ width: '1px', height: '24px', background: '#e6ecf0', margin: '0 4px' }} />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          $active={editor.isActive('heading', { level: 1 })}
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          $active={editor.isActive('heading', { level: 2 })}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          $active={editor.isActive('heading', { level: 3 })}
        >
          H3
        </ToolbarButton>
        
        <span style={{ width: '1px', height: '24px', background: '#e6ecf0', margin: '0 4px' }} />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          $active={editor.isActive('bulletList')}
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          $active={editor.isActive('orderedList')}
        >
          1. List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          $active={editor.isActive('blockquote')}
        >
          "
        </ToolbarButton>
        
        <span style={{ width: '1px', height: '24px', background: '#e6ecf0', margin: '0 4px' }} />
        
        <ToolbarButton onClick={setLink}>
          🔗
        </ToolbarButton>
        <ToolbarButton onClick={addImage}>
          🖼️
        </ToolbarButton>
        <ImageUploadButton>
          📤 Upload
          <ImageInput
            type="file"
            accept="image/*"
            onChange={uploadImage}
          />
        </ImageUploadButton>
        
        <span style={{ width: '1px', height: '24px', background: '#e6ecf0', margin: '0 4px' }} />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          ↩️
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          ↪️
        </ToolbarButton>
      </Toolbar>

      <EditorWrapper>
        <EditorContent editor={editor} />
      </EditorWrapper>

      <CharacterCount $isNearLimit={isNearLimit}>
        {charCount}/{maxLength} characters
        {isNearLimit && ' ⚠️ Near limit'}
      </CharacterCount>
    </div>
  )
}

export default TiptapEditor
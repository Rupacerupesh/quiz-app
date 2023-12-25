import React, { FC, useCallback, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Box, Card, Divider, Paper, ToggleButton, Typography } from '@mui/material'
import Underline from '@tiptap/extension-underline'

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { styled } from '@mui/material/styles'

import FormatBold from 'mdi-material-ui/FormatBold'
import FormatItalic from 'mdi-material-ui/FormatItalic'
import FormatUnderline from 'mdi-material-ui/FormatUnderline'
import FormatStrikethrough from 'mdi-material-ui/FormatStrikethrough'

import Placeholder from '@tiptap/extension-placeholder'

import FormatAlignLeftIcon from 'mdi-material-ui/FormatAlignLeft'
import FormatAlignCenterIcon from 'mdi-material-ui/FormatAlignCenter'
import FormatAlignRightIcon from 'mdi-material-ui/FormatAlignRight'
import FormatAlignJustifyIcon from 'mdi-material-ui/FormatAlignJustify'
import FormatListBulletedIcon from 'mdi-material-ui/FormatListBulleted'
import FormatListNumberedIcon from 'mdi-material-ui/FormatListNumbered'
import CodeArray from 'mdi-material-ui/CodeArray'
import TextAlign from '@tiptap/extension-text-align'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius
    }
  }
}))

interface EditorProps {
  onChange: (val: string) => void
  initialValue?: string
}

const Editor: FC<EditorProps> = props => {
  const { onChange, initialValue = '' } = props
  const [content, setContent] = useState<string>(initialValue)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Placeholder.configure({
        placeholder: 'Add Description'
      })
    ],
    content,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML()
      setContent(newContent)
      onChange(newContent)
    }
  })

  const toggleBold = useCallback(() => {
    editor?.chain().focus().toggleBold().run()
  }, [editor])

  const toggleUnderline = useCallback(() => {
    editor?.chain().focus().toggleUnderline().run()
  }, [editor])

  const toggleItalic = useCallback(() => {
    editor?.chain().focus().toggleItalic().run()
  }, [editor])

  const toggleStrike = useCallback(() => {
    editor?.chain().focus().toggleStrike().run()
  }, [editor])

  const toggleCode = useCallback(() => {
    editor?.chain().focus().toggleCode().run()
  }, [editor])

  const toggleBulletList = useCallback(() => {
    editor?.chain().focus().toggleBulletList().run()
  }, [editor])

  const toggleOrderedList = useCallback(() => {
    editor?.chain().focus().toggleOrderedList().run()
  }, [editor])

  return (
    <Card>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          borderBottom: theme => `2px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
          pb: 1,
          position: 'sticky',
          top: 10,
          zIndex: 9999
        }}
      >
        <StyledToggleButtonGroup size='small' exclusive aria-label='text alignment'>
          <ToggleButton
            value='h1'
            aria-label='H1 Text'
            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
            selected={editor?.isActive('heading', { level: 1 })}
          >
            <Typography fontWeight={900}>H1</Typography>
          </ToggleButton>
          <ToggleButton
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            selected={editor?.isActive('heading', { level: 2 })}
            value='h2'
            aria-label='H2 Text'
          >
            <Typography fontWeight={800}>H2</Typography>
          </ToggleButton>
          <ToggleButton
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
            selected={editor?.isActive('heading', { level: 3 })}
            value='h3'
            aria-label='H3 Text'
          >
            <Typography fontWeight={800}>H3</Typography>
          </ToggleButton>
          <ToggleButton
            onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
            selected={editor?.isActive('heading', { level: 4 })}
            value='h4'
            aria-label='H4 Text'
          >
            <Typography fontWeight={700}>H4</Typography>
          </ToggleButton>
          <ToggleButton
            onClick={() => editor?.chain().focus().toggleHeading({ level: 5 }).run()}
            selected={editor?.isActive('heading', { level: 5 })}
            value='h5'
            aria-label='H5 Text'
          >
            <Typography fontWeight={600}>H5</Typography>
          </ToggleButton>
          <ToggleButton
            onClick={() => editor?.chain().focus().toggleHeading({ level: 6 }).run()}
            selected={editor?.isActive('heading', { level: 6 })}
            value='h6'
            aria-label='H6 Text'
          >
            <Typography fontWeight={500}>H6</Typography>
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation='vertical' sx={{ mx: 0.5, my: 1 }} />
        <StyledToggleButtonGroup size='small' exclusive aria-label='text alignment'>
          <ToggleButton
            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
            selected={editor?.isActive({ textAlign: 'left' })}
            value='left'
            aria-label='left aligned'
          >
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
            selected={editor?.isActive({ textAlign: 'center' })}
            value='center'
            aria-label='Center aligned'
          >
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor?.chain().focus().setTextAlign('right').run()}
            selected={editor?.isActive({ textAlign: 'right' })}
            value='right'
            aria-label='Right aligned'
          >
            <FormatAlignRightIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
            selected={editor?.isActive({ textAlign: 'justify' })}
            value='justify'
            aria-label='Justify aligned'
          >
            <FormatAlignJustifyIcon />
          </ToggleButton>

          <Divider flexItem orientation='vertical' sx={{ mx: 0.5, my: 1 }} />

          <ToggleButton onClick={toggleBold} selected={editor?.isActive('bold')} value='bold'>
            <FormatBold />
          </ToggleButton>

          <ToggleButton onClick={toggleItalic} selected={editor?.isActive('italic')} value='italic'>
            <FormatItalic />
          </ToggleButton>

          <ToggleButton onClick={toggleUnderline} selected={editor?.isActive('underline')} value='underline'>
            <FormatUnderline />
          </ToggleButton>

          <ToggleButton onClick={toggleStrike} selected={editor?.isActive('strike')} value='strike'>
            <FormatStrikethrough />
          </ToggleButton>

          <ToggleButton onClick={toggleCode} selected={editor?.isActive('code')} value='strike'>
            <CodeArray />
          </ToggleButton>

          <ToggleButton onClick={toggleBulletList} selected={editor?.isActive('bulletList')} value='bulletList'>
            <FormatListBulletedIcon />
          </ToggleButton>

          <ToggleButton onClick={toggleOrderedList} selected={editor?.isActive('orderedList')} value='orderedList'>
            <FormatListNumberedIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
      <Box p={4}>
        <EditorContent editor={editor} />
      </Box>
    </Card>
  )
}

export default Editor

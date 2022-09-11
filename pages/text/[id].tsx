import React from 'react'
import { Container, Text, Input, Textarea } from '@nextui-org/react'
import TextEntity from '../../types/TextEntity'
import TextToken from '../../types/TextToken'
import TextDisplayer from '../../components/TextDisplayer'
import type { NextPage } from 'next'

export type Props = {
  currentText?: TextEntity,
  tokenizedText: TextToken[],
  isEditing: boolean,
  editingTitle?: string,
  editingContent?: string,
  onEditingTitleChange: (value: string) => void,
  onEditingContentChange: (value: string) => void,
}

const TextPage: NextPage<Props> = ({
  currentText,
  tokenizedText,
  isEditing,
  editingTitle,
  editingContent,
  onEditingTitleChange,
  onEditingContentChange,
}) => {
  if (!currentText) {
    return (
      <Container fluid responsive={false} gap={20}>
        <Text h1>The text was not found</Text>
      </Container>
    )
  }

  return (
    <Container fluid responsive={false} gap={20}>
      <Container fluid responsive={false} gap={0}>
        {!isEditing && <Text h1>{currentText.title}</Text>}
        {isEditing && (
          <Input
            size='xl'
            css={{ mt: '10px', mb: '20px' }}
            value={editingTitle}
            onChange={event => onEditingTitleChange(event.target.value)}
          />
        )}
      </Container>
      <Container fluid responsive={false} gap={0}>
        {!isEditing && <TextDisplayer tokenizedText={tokenizedText} />}
        {isEditing && (
          <Textarea
            value={editingContent}
            fullWidth
            rows={20}
            onChange={event => onEditingContentChange(event.target.value)}
          />
        )}
      </Container>
    </Container>
  )
}

export default TextPage

import React, { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { NextUIProvider, Spacer } from '@nextui-org/react'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import { v4 as uuidv4 } from 'uuid'
import { shuffle, cloneDeep } from 'lodash'
import TextEntity from '../types/TextEntity'
import TextToken from '../types/TextToken'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const id = router.query.id
  const [texts, setTexts] = useState<TextEntity[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingTitle, setEditingTitle] = useState<string | undefined>()
  const [editingContent, setEditingContent] = useState<string | undefined>()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [tokenizedText, serTokenizedText] = useState<TextToken[]>([])
  const [stageStep, setStageStep] = useState(0)
  const currentText = texts.find(({ id: textId }) => textId === id)

  useEffect(() => {
    setTexts(localStorage.texts ? JSON.parse(localStorage.texts) : [])
  }, [])

  useEffect(() => {
    if (!currentText) {
      setEditingTitle(undefined)
      setEditingContent(undefined)
      serTokenizedText([])
      return
    }

    setEditingTitle(currentText?.title)
    setEditingContent(currentText?.content)

    const tokens = currentText.content.match(/[A-Za-z0-9_’'-]+|\W+/g)
    if (!tokens) return
    const areWordsEven = /[A-Za-z0-9_’'-]+/.test(tokens[0])
    const tokenizedText: TextToken[] = tokens.map((substring, index) => {
      if (index % 2 === Number(!areWordsEven))
        return { id: uuidv4(), type: 'word', content: substring, stage: 'not-hidden'}
      else
        return { id: uuidv4(), type: 'separator', content: substring }
    })
    serTokenizedText(tokenizedText)
  }, [currentText])

  const  onTextAdd = () => {
    const id = uuidv4()
    const text: TextEntity = {
      id,
      title: 'Empty title',
      content: 'Empty text',
    }
    const newTexts = [text, ...texts]

    setTexts(newTexts)
    localStorage.texts = JSON.stringify(newTexts)

    setTimeout(() => router.push(`/text/${id}`), 0)
  }

  const onTextRemove = () => {
    if (!currentText) return
    const newTexts = texts.filter(({ id }) => id !== currentText.id)

    setTexts(newTexts)
    setIsPopoverOpen(false)

    localStorage.texts = JSON.stringify(newTexts)

    router.push('/')
  }

  const onSave = () => {
    if (!currentText) return

    const newTexts = cloneDeep(texts)
    const newCurrentText = newTexts.find(({ id: textId }) => textId === id)

    if (!newCurrentText) return

    newCurrentText.title = editingTitle || 'Empty title'
    newCurrentText.content = editingContent || 'Empty text'

    setTexts(newTexts)
    setIsEditing(false)

    localStorage.texts = JSON.stringify(newTexts)
  }

  const onNextStage = () => {
    const newTokenizedText = cloneDeep(tokenizedText)
    const nextStageStep = stageStep + 1
    const words = newTokenizedText.filter(({ type }) => type === 'word')

    const currentStage = nextStageStep <= 10 ? 'not-hidden' : 'partly-hidden'
    const nextStage = nextStageStep <= 10 ? 'partly-hidden' : 'fully-hidden'

    let wordsToHide = words.filter(({ stage }) => stage === currentStage)
    wordsToHide = shuffle(wordsToHide)
    wordsToHide = wordsToHide.slice(0, Math.ceil(0.1 * words.length))
    wordsToHide.forEach(token => token.stage = nextStage)

    serTokenizedText(newTokenizedText)
    setStageStep(nextStageStep)
  }

  return (
    <NextUIProvider>
      <Header
        currentText={currentText}
        isEditing={isEditing}
        isPopoverOpen={isPopoverOpen}
        stageStep={stageStep}
        onTextAdd={onTextAdd}
        onTextRemove={onTextRemove}
        onNextStage={onNextStage}
        onPopoverOpenStateChange={setIsPopoverOpen}
        onEdit={setIsEditing}
        onSave={onSave}
      />
      <Spacer y={2} />
      <Component
        {...pageProps}
        texts={texts}
        currentText={currentText}
        tokenizedText={tokenizedText}
        isEditing={isEditing}
        editingTitle={editingTitle}
        editingContent={editingContent}
        onEditingTitleChange={setEditingTitle}
        onEditingContentChange={setEditingContent}
      />
    </NextUIProvider>
  )
}

export default App

import React, { useState } from 'react'
import { Container, Text } from '@nextui-org/react'
import TextToken from '../types/TextToken'

type TokenDisplayerProps = {
  token: TextToken
}

const TokenDisplayer = ({ token: { type, content, stage } }: TokenDisplayerProps) => {
  const [isVisible, setIsVisible] = useState(false)

  let finalContent: string
  if (isVisible || stage === 'not-hidden' || type === 'separator') finalContent = content;
  else if (stage === 'partly-hidden')
    finalContent = content[0] + '*'.repeat(content.length - 1)
  else
    finalContent = '*'.repeat(content.length)

  return (
    <Text
      as='span'
      css={{cursor: 'pointer', whiteSpace: 'pre-line'}}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => window.open(`https://dictionary.cambridge.org/dictionary/english/${content}`, '_blank')}
    >
      {finalContent}
    </Text>
  )
}

export type Props = {
  tokenizedText: TextToken[],
}

const TextDisplayer = ({ tokenizedText }: Props) =>
  <Container fluid responsive={false} gap={0}>
    {tokenizedText.map(token => <TokenDisplayer key={token.id} token={token} />)}
  </Container>

export default TextDisplayer

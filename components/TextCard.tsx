import React from 'react'
import { Card, Text } from '@nextui-org/react'

type Props = { title?: string, text?: string, onClick: () => any }

const TextCard = ({
  title,
  text,
  onClick,
}: Props) =>
  <Card isPressable isHoverable onPress={onClick}>
    <Card.Header>
      <Text b>{title}</Text>
    </Card.Header>
    <Card.Divider />
    <Card.Body css={{ py: '$md' }}>
      <Text
        css={{
          '-webkit-line-clamp': '4',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {text}
      </Text>
    </Card.Body>
  </Card>

export default TextCard

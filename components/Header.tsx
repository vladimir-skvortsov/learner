import React from 'react'
import NextLink from 'next/link'
import { Container, Text, Link } from '@nextui-org/react'
import Actions, { Props as ActionProps } from './Actions'

type Props = ActionProps

const Header = ({
  currentText,
  isEditing,
  isPopoverOpen,
  stageStep,
  onTextAdd,
  onTextRemove,
  onNextStage,
  onPopoverOpenStateChange,
  onEdit,
  onSave,
}: Props) =>
  <Container
    fluid
    responsive={false}
    gap={20}
    css={{ py: '$sm', shadow: '$xs' }}
    display='flex'
    justify='space-between'
    alignItems='center'
  >
    <NextLink href='/'>
      <Link>
        <Text h2 css={{ m: '0' }}>Learner</Text>
      </Link>
    </NextLink>

    <Actions
      currentText={currentText}
      isEditing={isEditing}
      isPopoverOpen={isPopoverOpen}
      stageStep={stageStep}
      onTextAdd={onTextAdd}
      onTextRemove={onTextRemove}
      onNextStage={onNextStage}
      onPopoverOpenStateChange={onPopoverOpenStateChange}
      onEdit={onEdit}
      onSave={onSave}
    />
  </Container>

export default Header

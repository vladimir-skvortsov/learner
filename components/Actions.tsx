import React, { useEffect, useState } from 'react'
import TextEntity from '../types/TextEntity'
import { useRouter } from 'next/router'
import {
  Container,
  Text,
  Button,
  Spacer,
  Popover,
  Grid,
  Row,
} from '@nextui-org/react'

export type Props = {
  currentText?: TextEntity,
  isEditing: boolean
  isPopoverOpen: boolean
  stageStep: number
  onTextAdd: () => void
  onTextRemove: () => void
  onNextStage: () => void,
  onPopoverOpenStateChange: (state: boolean) => void
  onEdit: (state: boolean) => void
  onSave: () => void
}

const Actions = ({
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
}: Props) => {
  const router = useRouter()
  let buttons: JSX.Element[]

  useEffect(() => {
    onEdit(false)
    onPopoverOpenStateChange(false)
  }, [router.asPath, onEdit, onPopoverOpenStateChange])

  if (currentText && isEditing) {
    buttons = [
      <Button flat auto color='secondary' key='cancel' onClick={() => onEdit(false)}>
        Cancel
      </Button>,
      <Button flat auto key='save' onClick={onSave}>
        Save
      </Button>
    ]
  } else if (currentText) {
    buttons = [
      <Button flat auto key='edit' onClick={() => onEdit(true)}>
        Edit
      </Button>,
      <Popover isOpen={isPopoverOpen} onOpenChange={onPopoverOpenStateChange} key='remove'>
        <Popover.Trigger>
          <Button flat color='error' auto onClick={() => onPopoverOpenStateChange(true)}>
            Remove this text
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <Container>
            <Grid.Container
              css={{ borderRadius: '14px', padding: '0.75rem', maxWidth: '330px' }}
            >
              <Row justify='center' align='center'>
                <Text b>Confirm</Text>
              </Row>
              <Row>
                <Text>
                  Are you sure you want to delete this text?
                </Text>
              </Row>
              <Grid.Container justify='space-between' alignContent='center'>
                <Grid>
                  <Button size='sm' light onClick={() => onPopoverOpenStateChange(false)}>
                    Cancel
                  </Button>
                </Grid>
                <Grid>
                  <Button size='sm' shadow color='error' onClick={onTextRemove}>
                    Delete
                  </Button>
                </Grid>
              </Grid.Container>
            </Grid.Container>
          </Container>
        </Popover.Content>
      </Popover>,
    ]
    console.log('stageStep: ', stageStep);
    if (stageStep < 20) buttons.unshift(
      <Button flat auto color='secondary' key='next' onClick={onNextStage}>
        Next
      </Button>,
    )
  } else {
    buttons = [
      <Button flat auto key='new' onClick={onTextAdd}>
        New
      </Button>
    ]
  }

  buttons.forEach((button, index) => {
    buttons.splice(index * 2 + 1, 0, <Spacer x={1} />)
  })
  buttons.pop()

  return (
    <Container responsive={false} gap={0} display='flex' css={{ width: 'auto', m: 0 }}>
      {buttons}
    </Container>
  )
}

export default Actions

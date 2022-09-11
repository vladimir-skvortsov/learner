import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { Container, Grid } from '@nextui-org/react'
import TextCard from '../components/TextCard'
import { useRouter } from 'next/router'
import TextEntity from '../types/TextEntity'

export type Props = { texts: TextEntity[] }

const Home: NextPage<Props> = ({ texts }) => {
  const router = useRouter()

  return (
    <Container fluid responsive={false} gap={19}>
      <Grid.Container gap={2}>
        {texts.map(({ id, title, content }) => (
          <Grid xs={4} md={3} xl={2} key={id}>
            <TextCard
              title={title}
              text={content}
              onClick={() => router.push(`/text/${id}`)}
            />
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  )
}

export default Home

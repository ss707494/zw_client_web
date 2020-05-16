import React from 'react'
import styled from 'styled-components'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import {IconButton} from '@material-ui/core'
import {ls} from '../../tools/dealKey'
import {useRouter} from 'next/router'

const Box = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  justify-items: center;
  height: 60px;
  align-items: center;
`
export const HeaderTitle = ({title = ''}: {title?: string}) => {
  const router = useRouter()
  return <Box>
    <IconButton
        onClick={() => router.back()}
    >
      <ArrowBackIosIcon/>
    </IconButton>
    <main>
      {ls(title)}
    </main>
  </Box>
}

import React from 'react'
import styled from 'styled-components'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import {Box, IconButton} from '@material-ui/core'
import {ls} from '../../tools/dealKey'
import {useRouter} from 'next/router'
import {Maybe} from '../../graphqlTypes/types'
import {BoxProps} from '@material-ui/core/Box/Box'

const Contain = styled(Box)<BoxProps>`
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  justify-items: center;
  height: 60px;
  align-items: center;
`
export const HeaderTitle = ({title = '', backCall = () => {}}: {title?: Maybe<string>, backCall?: Function}) => {
  const router = useRouter()

  return <Contain
      boxShadow={1}>
    <IconButton
        onClick={() => {
          if (!(backCall && backCall())) {
            router.back()
          }
        }}
    >
      <ArrowBackIosIcon/>
    </IconButton>
    <main>
      {ls(title)}
    </main>
  </Contain>
}

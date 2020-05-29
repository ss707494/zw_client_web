import styled from "styled-components";
import React from 'react'

export const Box = styled.div`
  padding: 0 20px;
`

export const Space = ({h, w}: {h?: string | number, w?: string | number}) => {
  return <span
      style={{
        display: 'inline-block',
        width: w ?? '100%',
        height: h ?? '100%',
          ...(!w ? {
            display: 'block',
          } : {})
      }}
  />
}

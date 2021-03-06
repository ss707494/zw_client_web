import styled from "styled-components";
import React from 'react'

export const Box = styled.div`
  padding: 0 20px;
`

export const Space = ({h, w, c, isGrow}: {h?: string | number, w?: string | number, c?: string, isGrow?: boolean}) => {
  return <span
      style={{
        background: c || 'auto',
        display: 'inline-block',
        width: w ?? '100%',
        height: h ?? '100%',
        ...(!w ? {
            display: 'block',
          } : {}),
        ...(isGrow ? {
          flexGrow: 1,
          width: 'auto',
          height: 'auto',
        } : {})
      }}
  />
}

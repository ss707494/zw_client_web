import styled from "styled-components";
import React from 'react'

export const Box = styled.div`
  padding: 0 20px;
`

export const Space = ({h, w, c}: {h?: string | number, w?: string | number, c?: string}) => {
  return <span
      style={{
        background: c || 'auto',
        display: 'inline-block',
        width: w ?? '100%',
        height: h ?? '100%',
          ...(!w ? {
            display: 'block',
          } : {})
      }}
  />
}

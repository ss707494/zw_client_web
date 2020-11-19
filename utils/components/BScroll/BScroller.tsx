import React, {useEffect, useRef} from 'react'
import BetterScroll from 'better-scroll'
import {useStoreModel} from '../../ModelAction/useStore'
import {fpMergePre} from '../../tools/utils'
import {modelFactory} from '../../ModelAction/modelUtil'
import styled from 'styled-components'

const Box = styled.div<{
  isX?: boolean,
  boxHeight?: any,
  boxWidth?: any,
}>`
  ${({boxHeight, isX, boxWidth}) => `
    height: ${boxHeight || '100vh'};
    width: ${(isX && boxWidth) ? `${boxWidth}` : 'auto' };
    overflow: hidden;
  `}
`

export const bScrollModel = modelFactory('bScrollModel', {
  scroll: {} as any,
}, {
  setScroll: (value, option) => {
    option.setData(fpMergePre({
      scroll: value,
    }))
  },
})

export const BScroller = ({isX, children, boxHeight, boxWidth}: { children?: any, boxHeight?: any, boxWidth?: any, isX?: boolean }) => {
  const {state: bsState, actions: bsActions} = useStoreModel(bScrollModel)
  const scrollRef = useRef(null)
  useEffect(() => {
    // @ts-ignore
    const scroll = new BetterScroll(scrollRef.current, {
      click: true,
      scrollY: true,
      taps: true,
      ...(isX ? {
        scrollX: true,
        scrollY: false,
      } : {}),
      preventDefaultException: {
        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/,
        className: /(^|\s).*(MuiTextField-root|MuiSelect-select).*(\s|$)/,
      },
    })
    bsActions.setScroll(scroll)
    return () => {
      scroll.stop()
      scroll.destroy()
    }
  }, [])

  return (
      <Box
          isX={isX}
          boxHeight={boxHeight}
          boxWidth={boxWidth}
          ref={scrollRef}>
        <div
            style={isX ? {
              display: 'inline-block',
            } : {}}
        >{children}</div>
      </Box>
  )
}

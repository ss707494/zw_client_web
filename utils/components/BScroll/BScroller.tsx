import React, {useEffect, useRef} from 'react'
import BetterScroll from 'better-scroll'
import {useStoreModel} from '../../ModelAction/useStore'
import {fpMergePre} from '../../tools/utils'
import {modelFactory} from '../../ModelAction/modelUtil'

export const bScrollModel = modelFactory('bScrollModel', {
  scroll: {} as any,
}, {
  setScroll: (value, option) => {
    option.setData(fpMergePre({
      scroll: value,
    }))
  },
})

export const BScroller = ({children, boxHeight}: {children?: any, boxHeight?: any}) => {
  const {state: bsState, actions: bsActions} = useStoreModel(bScrollModel)
  const scrollRef = useRef(null)
  useEffect(() => {
    // @ts-ignore
    const scroll = new BetterScroll(scrollRef.current, {
      click: true,
      scrollY: true,
    })
    bsActions.setScroll(scroll)
    return () => {
      scroll.stop();
      scroll.destroy();
    }
  }, [])

  return (
      <div
          ref={scrollRef}
          className={'box'}>
        <div>{children}</div>
        <style jsx>{`
          .box {
            height: ${boxHeight || '100vh'};
            overflow: hidden;
          }
        `}</style>
      </div>
  )
}

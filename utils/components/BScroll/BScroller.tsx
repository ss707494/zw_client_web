import React, {useEffect, useRef} from 'react'
import BetterScroll from 'better-scroll'
import {modelFactory} from '../../ModelAction/modelUtil'
import {fpMergePre} from '../../tools/utils'
import {useStoreModel} from '../../ModelAction/useStore'

export const bScrollModel = modelFactory('bScrollModel', {
  scroll: {} as any,
}, {
  setScroll: (value, option) => {
    option.setData(fpMergePre({
      scroll: value,
    }))
  },
})

export const BScroller = ({children}: any) => {
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
        {children}
        <style jsx>{`
          .box {
            height: 100vh;
          }
        `}</style>
      </div>
  )
}

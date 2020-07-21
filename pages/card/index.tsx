import React from 'react'
import {FootBar} from '../../utils/components/FootBar/FootBar'
import { ls } from '../../utils/tools/dealKey'
import {BScroller} from '../../utils/components/BScroll/BScroller'

export default function Group() {
  return (
      <div>
        {ls('网站建设中...')}
        <BScroller
            isX={true}
            boxWidth={'100vw'}
            boxHeight={'200px'}
        >
          <div
              style={{display: 'inline-block', whiteSpace: 'nowrap'}}
          >
            {Array(44).fill(1).map((v, i) => <div
                key={i}
                style={{display: 'inline-block', margin: '2vw'}}>{i}</div>)}
          </div>
        </BScroller>
        <FootBar/>
      </div>
  )
}

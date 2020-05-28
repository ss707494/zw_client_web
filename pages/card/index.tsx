import React from 'react'
import {FootBar} from '../../utils/components/FootBar/FootBar'
import { ls } from '../../utils/tools/dealKey'

export default function Group() {
  return (
      <div>
        {ls('网站建设中...')}
        <FootBar/>
      </div>
  )
}

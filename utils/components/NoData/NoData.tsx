import { ls } from "../../tools/dealKey"
import React from 'react'

export const NoData = () => {

  return <div
      style={{textAlign: 'center'}}
  >{ls('暂无数据')}</div>
}

import React from 'react'
import {ls} from '../../utils/tools/dealKey'
import {mpStyle} from '../../utils/style/common'
import {modelFactory} from '../../utils/ModelAction/modelUtil'

export const registerModel = modelFactory('register', {
  step: 0,
}, {

})

export default function () {

  return (
      <div className={'box'}>
        <div className="header">
          <img
              src={'/img/home/logo.png'}
              alt=""/>
          <header>{ls('Market')}</header>
          <footer>{ls('Payless')}</footer>
          <main>{ls('欢迎来到马佩莱超市')}</main>
        </div>
        <div className="tab">{ls('注册')}</div>
        <div className="nav">
          <section
              className={``}
          >{ls('填写登录信息')}</section>
          <section>{ls('填写联系信息,完成注册')}</section>
        </div>
        <style jsx>{`
          .box {
            padding: 0 20px;
          }
          .header {
                margin-top: 20px;
                display: grid;
                grid-template-columns: 40px 1fr;
                grid-template-rows: 30px 30px 50px;
                > img {
                width: 32px;
                height: 56px;
                grid-area: 1/1/3/2;
                padding-right: 10px;
                }
                > header {
                font-size: 20px;
                align-self: end;
                }
                > footer {
                font-size: 20px;
                font-weight: bold;
                color: ${mpStyle.red};
                }
                > main {
                grid-area: 3/1/4/3;
                font-size: 24px;
                font-weight: bold;
                }
                }
          .tab {
            font-size: 22px;
          }
          .nav {
            display: flex;
            > section {
              
              
            }
          }
        `}</style>
      </div>
  )
}

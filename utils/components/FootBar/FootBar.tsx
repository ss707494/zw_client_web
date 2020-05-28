import React, {useEffect} from 'react'
import StorefrontIcon from '@material-ui/icons/Storefront'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import RedeemIcon from '@material-ui/icons/Redeem'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import { useRouter } from 'next/router'
import red from '@material-ui/core/colors/red'
import {AppFootBar} from '../../ss_common/enum'
import {useStoreModel} from '../../ModelAction/useStore'
import {meModel} from '../../view/me/model'

export const FootBar = () => {
  const router = useRouter()
  const {state: stateMe, actions: actionsMe} = useStoreModel(meModel)
  useEffect(() => {
    if (!stateMe.user.id) {
      actionsMe.getLoginUser()
    }
  }, [])

  const isAct = (path: any) => router.pathname.includes(path as string)
  return (
      <div
          className={'FootBar'}>
        {[
          ['逛店', <StorefrontIcon/>, `/${AppFootBar.home}`],
          ['拼团', <PeopleIcon/>, `/${AppFootBar.group}`],
          ['达人卡', <RedeemIcon/>, `/${AppFootBar.card}`],
          ['购物车', <ShoppingCartIcon/>, `/${AppFootBar.cart}`],
          ['我', <AccountBoxIcon/>, `/${AppFootBar.me}`],
        ].map(v => (
            <section
                key={`FootBar_${v[0]}`}
                className={isAct(v[2]) ? 'act' : ''}
                onClick={() => isAct(v[2]) ? '' : router.push(v[2] as string)}
            >
              {v[1]}
              <span>{v[0]}</span>
            </section>
        ))}
        <style jsx>{`
          .FootBar {
            position: fixed;
            bottom: 0;
            height: 45px;
            width: 100vw;
            box-shadow: 0 3px 4px 0 rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12), 0 1px 8px 0 rgba(0,0,0,0.20);
            background: #fff;
            display: flex;
            align-items: center;
            > section {
              flex-grow: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            }
          }
          .act {
            color: ${red[600]};
          }
        `}</style>
      </div>
  )
}

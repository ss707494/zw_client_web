import React, {useEffect} from 'react'
import StorefrontIcon from '@material-ui/icons/Storefront'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import RedeemIcon from '@material-ui/icons/Redeem'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import {useRouter} from 'next/router'
import red from '@material-ui/core/colors/red'
import {AppFootBar} from '../../ss_common/enum'
import {useStoreModel} from '../../ModelAction/useStore'
import {shopCartModel} from '../../view/cart'
import {mpStyle} from '../../style/common'
import {throttle} from 'lodash'
import {modelFactory} from '../../ModelAction/modelUtil'
import {fpMergePre} from '../../tools/utils'

const footBarModel = modelFactory('footBarModel', {
  hide: false,
}, {
  changeHide: (value: boolean, option) => {
    option.setData(fpMergePre({
      hide: value,
    }))
  },
})

let lastScrollTop = 0
export const FootBar = () => {
  const router = useRouter()
  const {state: stateShopCart, actions: actionsShopCart} = useStoreModel(shopCartModel)
  const {state: stateFootBarModel, actions: actionsFootBarModel} = useStoreModel(footBarModel)
  useEffect(() => {
    window.addEventListener("scroll", throttle(function () { // or window.addEventListener("scroll"....
      const st = window.pageYOffset || document.documentElement.scrollTop // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      if (st > lastScrollTop) {
        console.log('down')
        actionsFootBarModel.changeHide(true)
        // downscroll code
      } else {
        console.log('up')
        actionsFootBarModel.changeHide(false)
        // upscroll code
      }
      lastScrollTop = st <= 0 ? 0 : st // For Mobile or negative scrolling
    }, 500), false)
  }, [])
  useEffect(() => {
    if (!stateShopCart.user.id) {
      actionsShopCart.getList()
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
          ['购物车', <ShoppingCartIcon/>, `/${AppFootBar.cart}`, stateShopCart.dealProductNumber(stateShopCart)],
          ['我', <AccountBoxIcon/>, `/${AppFootBar.me}`],
        ].map(v => (
            <section
                key={`FootBar_${v[0]}`}
                className={isAct(v[2]) ? 'act' : ''}
                onClick={() => isAct(v[2]) ? router.reload() : router.push(v[2] as string)}
            >
              {v[1]}
              <span>{v[0]}</span>
              {~~v[3] > 0 && <aside>{v[3]}</aside>}
            </section>
        ))}
        <style jsx>{`
          .FootBar {
            transition: all 500ms ease 0s;
            position: fixed;
            bottom: ${stateFootBarModel.hide ? '-60px' : '0'};
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
              position: relative;
              > aside {
                position: absolute;
                top: 0;
                right: 20%;
                border-radius: 50%;
                width: 16px;
                height: 16px;
                background: ${mpStyle.red};
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
              }
            }
          }
          .act {
            color: ${red[600]};
          }
        `}</style>
      </div>
  )
}

import React, {useEffect} from "react"
import {useRouter} from "next/router"
import {mpStyle} from '../utils/style/common'
import {ls} from '../utils/tools/dealKey'
import {Button} from "@material-ui/core"

export const HomeRe = () => {
  const router = useRouter()
  useEffect(() => {
    // router.replace('/home/[appModule]', '/home/categorySelection', {})
  })

  return <div className={'box'}>
    <div className="title">
      <img src={"/img/home/logo_white.png"}
           alt=""/>
      <section>
        {ls('Market')}
      </section>
      <main>
        {ls('Payless')}
      </main>
    </div>
    <div className="actions">
      <Button
          size={'large'}
          style={{marginBottom: '20px'}}
          variant={'contained'}
          onClick={async () => {
            await router.push('/login')
          }}
      >{ls('登录')}</Button>
      <Button
          size={'large'}
          variant={'outlined'}
          onClick={async () => {
            await router.push('/register')
          }}
      >{ls('注册')}</Button>
    </div>

    <style jsx>{`
      .box {
        height: 100vh;
        background: ${mpStyle.red};
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .title {
        display: grid;
        grid-template-columns: 80px min-content;
        grid-template-rows: 40px;
        align-items: center;
        margin-top: 25vh;
        color: #fff;
        font-size: 20px;
        > img {
          width: 80px;
          grid-area: 1/1/3/2;
        }
        > section {
          align-self: end;
        }
        > main {
          font-weight: bold;
          align-self: start;
        }
      }
      .actions {
        width: calc(100vw - 40px);
        margin-top: 30vh;
        display: flex;
        flex-direction: column;
        :global(.MuiButton-outlined) {
          border-color: #fff;
          color: #fff;
        }
        :global(.MuiButton-contained) {
          color: ${mpStyle.red};
        }
      }

    `}</style>
  </div>
}

export default HomeRe


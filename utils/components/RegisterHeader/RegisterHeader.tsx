import React from 'react'
import styled from 'styled-components'
import { ll } from '../../tools/dealKey'
import {mpStyle} from '../../style/common'

const Header = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: 30px 30px 50px;
  margin-bottom: 40px;
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
    align-self: end;
  }
`

export const RegisterHeader = () => {
  return <Header>
    <img
        src={'/img/home/logo.png'}
        alt=""/>
    <header>{ll('Market')}</header>
    <footer>{ll('Payless')}</footer>
    <main>{ll('欢迎来到马佩莱超市')}</main>
  </Header>
}

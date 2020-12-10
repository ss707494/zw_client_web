import React from 'react'
import styled from 'styled-components'
import {Autocomplete} from '@material-ui/lab'
import {Avatar, Button, ButtonBase, InputAdornment, TextField} from '@material-ui/core'
import {Space} from '../../../../components/Box/Box'
import {ls} from '../../../../tools/dealKey'
import {ShoppingCartIconButton} from '../../../../components/ShoppingCartIconButton/ShoppingCartIconButton'
import {useRouter} from 'next/router'
import {usePcOrMobile} from '../../../../hooks/usePcOrMobile'
import {mpStyle} from '../../../../style/common'

const Box = styled.div`
  display: flex;
  margin: 25px 0 21px;
`
const Title = styled.div`
  cursor: pointer;
  > img {
    width: 120px;
    height: 49px;
  }
`
const SearchTip = styled.div`
  ${mpStyle.fontType.s};
  color: #9B9B9B;
  display: grid;
  justify-content: start;
  grid-auto-flow: column;
  grid-column-gap: 20px;
`
const SearchInput = styled.div`
  &&& {
    width: 600px;
    .MuiFormControl-root {
      margin: 0;
    }
    .MuiInputBase-root {
      height: 45px;
      padding-right: 0;
      background: #F5F5F5;
      border-color: transparent;
      border-radius: 10px;
    }
    .MuiInputAdornment-positionEnd {
      margin-left: 0;
    }
    .MuiButtonBase-root {
      height: 45px;
      width: 95px;
      box-shadow: none;
      border-radius: 0 10px 10px 0;
    }
    .MuiInputBase-input {
    }
    .MuiOutlinedInput-notchedOutline {
      display: none;
    }
    .MuiInput-underline {
      :after, :before {
        display: none;
      }
    }
  }
`
const AvatarBox = styled(ButtonBase)`
  display: flex;
  align-items: center;
  height: 45px;
  > h2 {
    ${mpStyle.fontType.n};
    font-weight: 600;
    color: #2C3345;
  }
`
const ShopCartBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 79px;
  height: 45px;
  background: #F5F5F5;
  border-radius: 8px;
`

export const TopAction = () => {
  const router = useRouter()
  usePcOrMobile()


  return <Box>
    <Title
        onClick={() => {router.push('/pc/home')}}
    >
      <img
          src={'/img/home/logo_pc.png'}
          alt=""/>
    </Title>
    <Space w={234}/>
    <SearchInput>
      <Autocomplete
          size={'small'}
          freeSolo
          disableClearable
          options={[]}
          value={''}
          onInputChange={() => {
          }}
          placeholder={ls('搜索全站鲜美食品')}
          renderInput={(params) => (
              <TextField
                  {...params}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position={'end'}>
                      <Button
                          variant={'contained'}
                          color={'secondary'}
                          onClick={() => {
                          }}
                      >搜索</Button>
                    </InputAdornment>,
                  }}
              />
          )}
      />
      <Space h={10}/>
      <SearchTip>
        {['乐事薯片', '好时巧克力', '思念水饺', '日清杯面'].map(v => <section
            key={`SearchTip>${v}`}
        >{v}</section>)}
      </SearchTip>
    </SearchInput>
    <Space w={26}/>
    <AvatarBox
        onClick={() => {
          router.push('/pc/me/myInfo')
        }}
    >
      <Avatar/>
      <Space w={8}/>
      <h2>{ls('我的账户')}</h2>
    </AvatarBox>
    <Space w={28}/>
    <ShopCartBox>
      <ShoppingCartIconButton/>
    </ShopCartBox>
  </Box>
}

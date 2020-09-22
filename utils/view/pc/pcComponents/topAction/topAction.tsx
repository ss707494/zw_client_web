import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import React from 'react'
import styled from 'styled-components'
import {mpStyle} from '../../../../style/common'
import {Autocomplete} from '@material-ui/lab'
import {Button, InputAdornment, MenuItem, Select, TextField, Avatar, IconButton, Badge} from '@material-ui/core'
import {Space} from '../../../../components/Box/Box'
import {ls} from '../../../../tools/dealKey'

const Box = styled.div`
  display: flex;
  padding: 24px 122px;
`
const Title = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, min-content);
  align-items: center;
  font-size: 18px;
  > img {
    grid-area: 1/1/3/2;
    width: 32px;
    height: 64px;
    margin-right: 16px;
  }
  > footer {
    font-weight: bold;
    color: ${mpStyle.red};
  }
`
const SearchInput = styled.div`
  &&& {
    width: 540px;
    .MuiInputBase-root {
      padding-right: 0;
      background: #F5F5F5;
      border-color: transparent;
    }
    .MuiButtonBase-root {
      height: 40px;
      box-shadow: none;
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
const AvatarBox = styled.div`
  display: flex;
  align-items: center;
  > h2 {
    font-weight: bold;
  }
`
const ShopCartBox = styled.div`
  display: flex;
  align-items: center;
`

export const TopAction = () => {

  return <Box>
    <Title>
      <img
          src={'/img/home/logo.png'}
          alt=""/>
      <header>Market</header>
      <footer>Payless</footer>
    </Title>
    <Space w={200}/>
    <SearchInput>
      <Autocomplete
          size={'small'}
          freeSolo
          disableClearable
          options={[]}
          value={''}
          onInputChange={() => {
          }}
          renderInput={(params) => (
              <TextField
                  {...params}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position={'end'}>
                      <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={0}
                          onChange={() => {
                          }}
                          placeholder={ls('选择分类')}
                      >
                        <MenuItem value={0}>全部分类</MenuItem>
                      </Select>
                      <Space w={8}/>
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
    </SearchInput>
    <Space isGrow={true}/>
    <AvatarBox>
      <Avatar/>
      <Space w={8}/>
      <h2>{ls('我的账户')}</h2>
    </AvatarBox>
    <Space w={48}/>
    <ShopCartBox>
      <IconButton>
        <Badge badgeContent={4}
               color="secondary">
          <ShoppingCartIcon/>
        </Badge>
      </IconButton>
    </ShopCartBox>
  </Box>
}

import grey from '@material-ui/core/colors/grey'
import styled from 'styled-components'

export const mpStyle = {
  red: '#F84033',
  grey: grey['400'],
  greyLite: grey['200'],
  shadow: {
    1: '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
  },
  space: {
    xxl: 56,
    xl: 48,
    l: 40,
    n: 32,
    s: 24,
    xs: 16,
    xxs: 8,
  },
  spacePx: {
    xxl: '56px',
    xl: '48px',
    l: '40px',
    n: '32px',
    s: '24px',
    xs: '16px',
    xxs: '8px',
  },
  fontType: {
    xxl: `
      font-size: 24px; 
      font-weight: bold;
    `,
    l: `
      font-size: 22px; 
      font-weight: bold;
    `,
    n: `
      font-size: 20px; 
    `,
    s: `
      font-size: 18px; 
    `,
  },
  scrollbar: `
    /* 滚动条 */
    ::-webkit-scrollbar-thumb:horizontal { /*水平滚动条的样式*/
        width: 4PX;
        background-color: #CCCCCC;
        -webkit-border-radius: 6PX;
    }
    ::-webkit-scrollbar-track-piece {
        background-color: #fff; /*滚动条的背景颜色*/
        -webkit-border-radius: 0; /*滚动条的圆角宽度*/
    }
    ::-webkit-scrollbar {
        width: 10PX; /*滚动条的宽度*/
        height: 8PX; /*滚动条的高度*/
    }
    ::-webkit-scrollbar-thumb:vertical { /*垂直滚动条的样式*/
        height: 50PX;
        background-color: #999;
        -webkit-border-radius: 4PX;
        outline: 2PX solid #fff;
        outline-offset: -2PX;
        border: 2PX solid #fff;
    }
    ::-webkit-scrollbar-thumb:hover { /*滚动条的hover样式*/
        height: 50PX;
        background-color: #9f9f9f;
        -webkit-border-radius: 4PX;
    }
  `,
  ellipsis: `
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  `,
}

export const RedBox = styled.div`
  color: ${mpStyle.red};
`

import 'cross-fetch/polyfill'
import {getToken, setToken} from '../tools/token'
import {Operation} from 'apollo-link'
import {ErrorLink} from 'apollo-link-error'
import Router from 'next/router'
import ApolloClient from 'apollo-boost'
import {ssLog} from '../tools/global'
import {DocumentNode} from 'graphql'
import {doc} from '../graphqlTypes/doc'
import {showMessage} from '../components/Message/Message'

export const getClient = () => {

  const request: (operation: Operation) => Promise<void> | void = (operation) => {
    // if (operation.variables) {
    //   operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename)
    // }
    operation.setContext(({headers = {}}) => ({
      headers: {
        ...headers,
        // 后台万能权限
        Authorization: getToken(),
      },
    }))
  }

  const refreshToken = () => {
    graphQLQuery()(doc.refreshToken, {
      data: getToken('refreshtoken')
    })
        .then(res => {
          if (res.data?.refreshToken?.token) {
            setToken(res.data?.refreshToken?.token)
            setToken(res.data?.refreshToken?.refreshtoken, 'refreshtoken')
            showMessage({message: '登录超时,刷新登录信息'})
            Router.reload()
          } else {
            showMessage({message: '请重新登录'})
            Router.push('/login')
          }
        }).catch(err => {
      ssLog(err)
      showMessage({message: '请重新登录'})
      Router.push('/login')
    })
  }
  const onError: ErrorLink.ErrorHandler = ({response, operation, graphQLErrors, networkError}) => {
    // console.log(response)
    // console.log(operation)
    if (graphQLErrors) {
      graphQLErrors.forEach(({message, locations, path, extensions}) => {
        ssLog(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        )
        if (extensions?.code === 'UNAUTHENTICATED') {
          if (message.includes('first')) {
            refreshToken()
          } else {
            showMessage({message: '请重新登录'})
            Router.push('/login')
          }
        }
        if (message.includes('Unexpected error')) {
          showMessage({
            message: message.split('"')[1],
            msg_type: 'error',
          })
        } else {
          showMessage({message})
        }
      })
    }

    if (networkError) {
      const errMsg = ('bodyText' in networkError) ? networkError?.bodyText : ('result' in networkError) ? networkError?.result?.error : ''
      ssLog(`[Network error]: ${errMsg}`)
      if ('statusCode' in networkError && networkError?.statusCode === 401) {
        if (errMsg.includes('first') && getToken('refreshtoken')) {
          refreshToken()
        } else {
          showMessage({message: '请重新登录'})
          Router.push('/login')
        }
      }
    }
  }

  return new ApolloClient({
    // link: httpLink,
    uri: process.env.client_api_uri || 'http://localhost:4464/type__graphql/api',
    request,
    onError,
  })
}

const defaultClient = getClient()

// const dealParams = ((params: any) => ({
//   data: params,
// }))
const dealParams = ((params: any) => params)

export const graphQLQuery = (client = defaultClient) => async (query: DocumentNode, params: any, option?: any) => {
  const _dealParamsIn = option?.dealParamsIn ?? dealParams
  return client.query({
    fetchPolicy: 'network-only',
    query,
    variables: {
      ...(_dealParamsIn ? _dealParamsIn(params) : params),
    },
    ...option,
  })
}

export const graphQLMutate = (client = defaultClient) => async (mutation: any, params: any, option?: any) => {
  const _dealParamsIn = option?.dealParamsIn ?? dealParams
  return client.mutate({
    mutation,
    variables: {
      ...(_dealParamsIn ? _dealParamsIn(params) : params),
    },
    ...option,
  })
}

const serverClient = () => new ApolloClient({
  // link: httpLink,
  uri: process.env.client_api_uri || 'http://localhost:4464/type__graphql/api',
})

export const serverQuery = async (query: any, params: any, option?: any) => (await graphQLQuery(serverClient())(query, params, option))?.data

export const serverMutate = async (mutation: any, params: any, option?: any) => (await graphQLMutate(serverClient())(mutation, params, option))?.data


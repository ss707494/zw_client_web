import {useCallback, useEffect, useState} from "react"
import {graphQLMutate, graphQLQuery} from '../client'
import {baseActionOption} from './modelUtil'

export const originStore: OriginStore = {}

const isFunction = (functionToCheck: any) => {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
}

type StoreStateResult<T, E extends ModelActionObjHelp<any, T>> = ModelResult<T, E> & {
  store: OriginStore
  getLoad: (query: any) => number
}

type UseModelState = <T extends FetchObj, E extends ModelActionObjHelp<any, T>>(model: ModelData<T, E>, key?: string | [string, string]) => StoreStateResult<T, E>

export const dealNameSpace = (key: string, nameSpace: string) => {
  if (nameSpace) {
    return `${key}_${nameSpace}`
  }
  return `${key}`
}

export const useStoreModel: UseModelState = (model, key?: string | [string, string]) => {
  const _key = (((key && Array.isArray(key)) && dealNameSpace(key[0], key[1]))
      || key || model.name) as string
  const {actions, state} = model
  const [, setState] = useState(Object.create(null))
  if (!_key) {
    throw Error('no key')
  }
  if (!originStore[_key]) {
    originStore[_key] = {
      keys: _key,
      state,
      actions: {},
      setData: []
    }
  }
  const notice = useCallback((data: any) => {
    originStore[_key].setData.forEach(value => {
      value?.(data)
    })
  }, [_key])
  const setData: Dispatch<SetStateAction<typeof state>> = useCallback((data) => {
    const oldState = originStore[_key].state
    const newData = isFunction(data) ? (data as (v: typeof oldState) => void)(oldState) : data
    originStore[_key].state = newData
    notice(newData)
  }, [_key, notice])

  const setLoad = useCallback((query: any, flag: boolean) => {
    setData(prevState => ({
      ...prevState,
      fetchLoad: {
        ...prevState.fetchLoad ?? {},
        [query?.loc?.source?.body]: flag,
      }
    }))
  }, [setData])
  const setError = useCallback((query: any, err: any) => {
    setData(prevState => ({
      ...prevState,
      fetchError: {
        ...prevState.fetchError ?? {},
        [query?.loc?.source?.body]: err,
      }
    }))
  }, [setData])

  const query: GraphqlQuery = useCallback(async (queryDoc, params, option) => {
    const queryDocString = queryDoc.doc
    setLoad(queryDocString, true)
    const res = await graphQLQuery()(queryDocString, params, option).catch(e => {
      setError(queryDocString, e)
    }).finally(() => {
      setLoad(queryDocString, false)
    }) as any
    return res?.data
  }, [setError, setLoad])
  const mutate: GraphqlMutate = useCallback(async (mutationDoc, params, option) => {
    const mutationDocString = mutationDoc.doc
    setLoad(mutationDocString, true)
    const res = await graphQLMutate()(mutationDocString, params, option).catch(e => {
      setError(mutationDocString, e)
    }).finally(() => {
      setLoad(mutationDocString, false)
    }) as any
    return res?.data
  }, [setError, setLoad])

  if (Object.keys(originStore[_key].actions).length === 0 && originStore[_key].actions.constructor === Object) {
    Object.keys(actions).forEach(value => {
      originStore[_key].actions[value] = (v: any) => actions[value](v, {
        ...baseActionOption,
        data: originStore[_key].state,
        actions: originStore[_key].actions,
        notice,
        setData,
        query,
        mutate,
        store: originStore,
      })
    })
  }
  useEffect(() => {
    Object.keys(actions).forEach(value => {
      originStore[_key].actions[value] = (v: any) => actions[value](v, {
        ...baseActionOption,
        data: originStore[_key].state,
        actions: originStore[_key].actions,
        notice,
        setData,
        query,
        mutate,
        store: originStore,
      })
    })
  }, [_key, actions, mutate, notice, query, setData])
  useEffect(() => {
    originStore[_key].setData = [
      ...originStore[_key].setData ?? [],
      setState,
    ]
    return () => {
      originStore[_key].setData = originStore[_key].setData.filter(value => value !== setState)
    }
  }, [_key])

  return {
    state: originStore[_key].state,
    actions: (originStore[_key].actions) as DealFunObj<typeof actions>,
    store: originStore,
    getLoad: query => originStore[_key].state.fetchLoad[query?.doc?.loc?.source?.body] ? 1 : 0
  }
}


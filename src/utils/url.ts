import { cleanObject } from 'utils';
/**
 * 返回页面url中指定键的参数值
 */

import { useMemo } from "react"
import { useSearchParams, URLSearchParamsInit } from "react-router-dom"

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParams] = useSearchParams()
    return [
        useMemo(() =>
            keys.reduce((prev: { [key in K]: string }, key: K) => {
                return { ...prev, [key]: searchParams.get(key) || '' }
            }, {} as { [key in K]: string })
            // eslint-disable-next-line react-hooks/exhaustive-deps
            , [searchParams])
        , (params: Partial<{ [key in K]: unknown }>) => {
            const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
            return setSearchParams(o)
        }
    ] as const
}
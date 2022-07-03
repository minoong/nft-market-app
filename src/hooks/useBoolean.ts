import { Dispatch, SetStateAction, useCallback, useState } from 'react'

interface ReturnType {
 value: boolean
 setValue: Dispatch<SetStateAction<boolean>>
 setTrue: () => void
 setFalse: () => void
 toggle: () => void
}

export default function useBoolean(initialValue?: boolean): ReturnType {
 const [value, setValue] = useState<boolean>(Boolean(initialValue))

 const setTrue = useCallback(() => setValue(true), [])
 const setFalse = useCallback(() => setValue(false), [])
 const toggle = useCallback(() => setValue((prev) => !prev), [])

 return {
  value,
  setValue,
  setTrue,
  setFalse,
  toggle,
 }
}

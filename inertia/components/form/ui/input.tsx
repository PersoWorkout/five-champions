import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

interface InputProps {
  name: string
  type: HTMLInputTypeAttribute | undefined
  value: string | number | readonly string[] | undefined
  placeholder?: string | undefined
  onChange: ChangeEventHandler<HTMLInputElement>
}

export function Input({ name, type = 'text', placeholder, value, onChange }: InputProps) {
  return (
    <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} />
  )
}

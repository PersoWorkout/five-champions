import { Input } from '~/components/form/ui/input'
import { Label } from '~/components/form/ui/label'
import type { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

interface FormInputGroupProps {
  title: string
  name: string
  value: string | number | readonly string[] | undefined
  inputType?: HTMLInputTypeAttribute | undefined
  placeholder?: string | undefined
  onChange: ChangeEventHandler<HTMLInputElement>
  error: string | undefined
}

export function FormInputGroup({
  name,
  title,
  value,
  inputType = 'text',
  placeholder,
  onChange,
  error,
}: FormInputGroupProps) {
  return (
    <div className="form-input-group">
      <Label value={title} htmlFor={name} />
      <Input
        name={name}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <small>{error}</small>}
    </div>
  )
}

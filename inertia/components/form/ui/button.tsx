import { ReactNode } from 'react'

interface FormButtonProps {
  name: string | undefined
  className: 'button-primary' | 'button-secondary'
  children: ReactNode
}

export function FormButton({ name, className, children }: FormButtonProps) {
  return (
    <button type="submit" name={name} className={className}>
      {children}
    </button>
  )
}

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode
    variant?: "primary" | "secondary" | "danger"
}

export function Button(props: ButtonProps){
  const{
    children,
    variant = "primary",
    className = "",
    style,
    ...rest
  } = props

  return (
    <button 
      className={`btn btn-${variant} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </button>
  )
}
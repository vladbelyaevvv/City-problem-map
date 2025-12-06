import type { ReactNode } from 'react'
import './Button.css'

export interface ButtonProps {
    children: ReactNode
    onClick?: () => void
    type?: "button" | "submit" | "reset"
    variant?: "primary" | "secondary"
}

export function Button(props: ButtonProps){
  const{
    children,
    onClick,
    type = "button",
    variant = "primary",
  } = props

  return (
    <button 
      type ={type}
      onClick={onClick}
      className={`btn btn-${variant}`}>
      {children}
    </button>
  )
}
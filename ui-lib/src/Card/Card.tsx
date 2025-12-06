import type { ReactNode } from 'react'
import './Card.css'

export interface CardProps {
    children: ReactNode
    className?: string
}

export function Card(props: CardProps){
  const { children, className} = props

  return (
    <div className={`card ${className ?? ""}`}>
      {children}
    </div>
  )
}
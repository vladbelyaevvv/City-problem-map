import type { CSSProperties, ReactNode } from 'react'
import './Card.css'

export interface CardProps {
    children: ReactNode
    className?: string
    style?: CSSProperties
}

export function Card(props: CardProps){
  const { children, className, style } = props
  return (
    <div 
      className={`card ${className ?? ""}`} 
      style={style}
    >
      {children}
    </div>
  )
}
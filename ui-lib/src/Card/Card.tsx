import './Card.css'
export interface CardProps {
    children: React.ReactNode
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
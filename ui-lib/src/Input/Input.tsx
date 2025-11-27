import './Input.css'

export interface InputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    type?: string
}

export function Input(props: InputProps){
    const{
        value,
        onChange,
        placeholder,
        type = "text",
    } = props

    return (
        <input
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            type={type}
            className="input"
        />
    )
}
import { Link } from "react-router-dom"
import './Header.css'

export interface HeaderProps {
  title: string;
  nav: Array<{ label: string; href: string }>;
}

export function Header(props: HeaderProps) {
  const { title, nav } = props

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-title">{title}</Link>
        <nav className="header-nav">
          {nav.map((item) => (
            <Link key={item.href} to={item.href} className="header-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

import './Header.css'

export interface HeaderProps{
    title:string
    nav: Array<{label: string; href: string}>
}

export function Header(props: HeaderProps){
  const {title, nav} = props

  return (
    <header>
      <div className="header-title">{title}</div>
      <nav className="header-nav">
        {nav.map((item)=>
          <a key={item.href} href={item.href}>{item.label} </a>)}
      </nav>
    </header>
  )
}
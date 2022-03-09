import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router'

export default function BurgerMenus({setMenuOpen, menuOpen}) {

	const [home, setHome] = useState(false)
	const [service, setService] = useState(false)
	const [blog, setBlog] = useState(false)
	const [pages, setPages] = useState(false)

	const router = useRouter()
	const [path, setPath] = useState("")
	useEffect(() => {
		setPath(router.pathname)
	}, [router])

	const toggleMenu = menu => {
		
		if( menu == 'home'){
			setHome(!home)
			setService(false)
			setBlog(false)
			setPages(false)
		}
		else if( menu == 'service'){
			setHome(false)
			setService(!service)
			setBlog(false)
			setPages(false)
		}
		else if( menu == 'blog'){
			setHome(false)
			setService(false)
			setBlog(!blog)
			setPages(false)
		}
		else if( menu == 'pages'){
			setHome(false)
			setService(false)
			setBlog(false)
			setPages(!pages)
		}
	}; 

	


	return (
		<div className={menuOpen ? "side-mobile-menu d-block d-xl-done d-lg-none open": "side-mobile-menu d-block d-xl-done d-lg-none"}>
			<div className="close-mobile-menu" onClick={() => setMenuOpen(false)}>
				<span><i><FontAwesomeIcon icon={['fas', 'times']}/></i></span>
			</div>
			<div className="mm-menu">
				<ul>				
					<li >
                        <Link href="/" as="/" >
                          <a className={path ==="/" ? "active" : ""} >Home</a>
                        </Link>
                      </li>
                      <li >
                        <Link href="/katalog" as="/katalog">
                          <a className={path === "/katalog" ? "active" : ""}  >Katalog</a>
                        </Link>
                      </li>
                      <li >
                        <Link href="/tentang" as="/tentang">
                          <a className={path === "/tentang" ? "active" : ""} >Tentang</a>
                        </Link>
                      </li>
                      <li >
                        <Link href="/kontak" as="/kontak">
                          <a className={path === "/kontak" ? "active" : ""} >Kontak</a>
                        </Link>
                      </li>
                      <li >
                        <Link href="/pertanyaan" as="/pertanyaan">
                          <a className={path === "/pertanyaan" ? "active" : ""} >Pertanyaan</a>
                        </Link>
                      </li>
				</ul>
			</div>
		</div>
	)
}



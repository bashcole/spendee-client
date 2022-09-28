import type {NextPage} from 'next'
import Link from 'next/link'
import {useSelector} from "react-redux";

import {
    StyledHeader,
    StyledHeaderContent, StyledHeaderLogo
} from './style'
import {INavItem, IRootStore} from "@store/index";
import Logo from "@components/Layout/Main/components/Header/components/Logo";
import MobileNav from "@components/Layout/Main/components/Header/components/MobileNav";
import DesktopNav from "@components/Layout/Main/components/Header/components/DesktopNav";

const Header: NextPage = () => {

    const navItems = useSelector<IRootStore, Array<INavItem>>(state => state.ui.navItems)
    const isUserAuth = useSelector<IRootStore, boolean>(state => state.auth.isAuth)

    return (
        <StyledHeader>
            <StyledHeaderContent isAuth={isUserAuth}>
                <Link href={"/"} passHref>
                    <StyledHeaderLogo>
                        <Logo/>
                    </StyledHeaderLogo>
                </Link>
                {isUserAuth && <>
                    <DesktopNav navItems={navItems}/>
                    <MobileNav navItems={navItems}/>
                </>
                }
            </StyledHeaderContent>
        </StyledHeader>

    )
}

export default Header

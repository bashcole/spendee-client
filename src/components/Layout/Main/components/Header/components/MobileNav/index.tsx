import React, {useState} from 'react';
import Link from "next/link";
import {useSelector} from "react-redux";
import {INavItem, IRootStore} from "@store/index";
import useDisableScroll from "@hooks/useDisableScroll";
import {useTranslations} from "next-intl";
import {useRouter} from "next/router";

import {
    StyledHeaderMobileMenu, StyledHeaderMobileMenuBody,
    StyledHeaderMobileMenuButton,
    StyledHeaderMobileMenuButtonSvg, StyledHeaderMobileMenuHeader, StyledHeaderMobileMenuWrap, StyledHeaderUserFlag
} from "@components/Layout/Main/components/Header/style";
import {
    StyledDivider,
    StyledMenuNav,
    StyledMobileMenuClose,
    StyledMenuNavItem,
    StyledUserMenu, StyledUserAvatar, StyledUseDetails
} from "@components/Layout/Main/components/Header/components/MobileNav/style";
import {IUser} from "@interfaces/user";
import Logo from "@components/Layout/Main/components/Header/components/Logo";

const MobileNav = ({navItems}: { navItems: INavItem[] }) => {

    const router = useRouter()
    const t = useTranslations("Menu");
    const [isOpen, setIsOpen] = useState(false)
    const user = useSelector<IRootStore, IUser>(state => state.auth.user)
    const {allowScroll, disableScroll} = useDisableScroll()

    const openMenu = () => {
        setIsOpen(true)
        disableScroll()
    }

    const hideMenu = () => {
        setIsOpen(false)
        allowScroll()
    }

    const handleLocaleClick = () => {
        hideMenu()
    }

    return (<>
        <StyledHeaderMobileMenuButton onClick={openMenu}>
            <StyledHeaderMobileMenuButtonSvg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                ></path>
            </StyledHeaderMobileMenuButtonSvg>
        </StyledHeaderMobileMenuButton>

        <StyledHeaderMobileMenu isOpen={isOpen}>
            <StyledHeaderMobileMenuWrap>
                <StyledHeaderMobileMenuBody>
                    <StyledHeaderMobileMenuHeader>
                        <Logo/>
                        <StyledMobileMenuClose onClick={hideMenu}>
                            <svg
                                width="24"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </StyledMobileMenuClose>
                    </StyledHeaderMobileMenuHeader>
                    <div className="header__mobile-menu-content">
                        <StyledMenuNav>
                            {
                                navItems.map((navItem: INavItem) => (
                                    <Link href={navItem.url} key={navItem.url}>
                                        <StyledMenuNavItem onClick={hideMenu}>{t(navItem.name)}</StyledMenuNavItem>
                                    </Link>
                                ))
                            }
                        </StyledMenuNav>

                        <StyledDivider/>

                        <StyledUserMenu className="header_mobile-menu-user">
                            <StyledUserAvatar
                                src={user.picture}
                                alt={`${user.name} picture`}
                            />
                            <StyledUseDetails>
                                <div className="header_mobile-menu-user-name">{user.name}</div>
                                <div className="header_mobile-menu-user-email">
                                    {user.email}
                                </div>
                            </StyledUseDetails>
                        </StyledUserMenu>

                        <StyledMenuNav>
                            <Link href={router.asPath} locale="bg">
                                <StyledMenuNavItem onClick={handleLocaleClick}><StyledHeaderUserFlag
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3">
                                    <path fill="#fff" d="M0 0h5v3H0z"/>
                                    <path fill="#00966E" d="M0 1h5v2H0z"/>
                                    <path fill="#D62612" d="M0 2h5v1H0z"/>
                                </StyledHeaderUserFlag> BG</StyledMenuNavItem>
                            </Link>
                            <Link href={router.asPath} locale="en">
                                <StyledMenuNavItem onClick={handleLocaleClick}><StyledHeaderUserFlag
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 7410 3900">
                                    <path fill="#b22234" d="M0 0h7410v3900H0z"/>
                                    <path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff"
                                          strokeWidth="300"/>
                                    <path fill="#3c3b6e" d="M0 0h2964v2100H0z"/>
                                    <g fill="#fff">
                                        <g id="d">
                                            <g id="c">
                                                <g id="e">
                                                    <g id="b">
                                                        <path id="a"
                                                              d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"/>
                                                        <use href="#a" y="420"/>
                                                        <use href="#a" y="840"/>
                                                        <use href="#a" y="1260"/>
                                                    </g>
                                                    <use href="#a" y="1680"/>
                                                </g>
                                                <use href="#b" x="247" y="210"/>
                                            </g>
                                            <use href="#c" x="494"/>
                                        </g>
                                        <use href="#d" x="988"/>
                                        <use href="#c" x="1976"/>
                                        <use href="#e" x="2470"/>
                                    </g>
                                </StyledHeaderUserFlag> EN</StyledMenuNavItem>
                            </Link>

                            <StyledMenuNavItem href="#">{t("Settings")}</StyledMenuNavItem>
                            <Link href={"/auth/logout"}>
                                <StyledMenuNavItem>{t("Log Out")}</StyledMenuNavItem>
                            </Link>
                        </StyledMenuNav>

                    </div>

                </StyledHeaderMobileMenuBody>
            </StyledHeaderMobileMenuWrap>
        </StyledHeaderMobileMenu>
    </>)
};

export default MobileNav;
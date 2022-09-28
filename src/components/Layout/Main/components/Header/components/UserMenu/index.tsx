import React from 'react';
import {useRouter} from 'next/router';
import {
    StyledHeaderOverlay, StyledHeaderUser,
    StyledHeaderUserAvatar,
    StyledHeaderUserIcon,
    StyledHeaderUserMain,
    StyledHeaderUserMenu,
    StyledHeaderUserMenuItem,
    StyledHeaderUserMenuLink,
    StyledHeaderUserMenuList,
    StyledHeaderUserFlag,
    StyledHeaderUserName
} from "@components/Layout/Main/components/Header/style";
import Link from "next/link";
import {useTranslations} from "next-intl";
import {useDispatch, useSelector} from "react-redux";
import {IRootStore} from "@store/index";
import {uiActions} from "@store/reducers/ui-slice";
import {IUser} from "@interfaces/user";

const HeaderUser = () => {
    const router = useRouter()

    const isMenuOpen = useSelector<IRootStore, boolean>(state => state.ui.isMenuOpen)
    const dispatch = useDispatch()

    const t = useTranslations("Menu");
    const handleClick = () => {
        dispatch(uiActions.toggleMenu())
    }

    const user = useSelector<IRootStore, IUser>(state => state.auth.user)
    const isAuth = useSelector<IRootStore, boolean>(state => state.auth.isAuth)

    return (
        <>
        {isAuth && <StyledHeaderUser>
            <StyledHeaderUserMain onClick={handleClick}>
                <StyledHeaderUserAvatar src={user.picture}
                                        alt={user.name}/>
                <StyledHeaderUserName>{user.name}</StyledHeaderUserName>
                <StyledHeaderUserIcon isOpen={isMenuOpen}/>
            </StyledHeaderUserMain>
            <StyledHeaderUserMenu isOpen={isMenuOpen}>
                <StyledHeaderUserMenuList isOpen={isMenuOpen}>

                    <StyledHeaderUserMenuItem>
                        <Link href={router.asPath} locale="bg">
                            <StyledHeaderUserMenuLink onClick={handleClick}><StyledHeaderUserFlag
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3">
                                <path fill="#fff" d="M0 0h5v3H0z"/>
                                <path fill="#00966E" d="M0 1h5v2H0z"/>
                                <path fill="#D62612" d="M0 2h5v1H0z"/>
                            </StyledHeaderUserFlag> BG</StyledHeaderUserMenuLink>
                        </Link>
                    </StyledHeaderUserMenuItem>
                    <StyledHeaderUserMenuItem>
                        <Link href={router.asPath} locale="en">
                            <StyledHeaderUserMenuLink onClick={handleClick}><StyledHeaderUserFlag
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
                            </StyledHeaderUserFlag> EN</StyledHeaderUserMenuLink>
                        </Link>
                    </StyledHeaderUserMenuItem>

                    <StyledHeaderUserMenuItem>
                        <StyledHeaderUserMenuLink href="#">{t("Settings")}</StyledHeaderUserMenuLink>
                    </StyledHeaderUserMenuItem>

                    <StyledHeaderUserMenuItem>
                        <Link href={"/auth/logout"}>
                            <StyledHeaderUserMenuLink onClick={handleClick}>{t("Log Out")}</StyledHeaderUserMenuLink>
                        </Link>
                    </StyledHeaderUserMenuItem>
                </StyledHeaderUserMenuList>
            </StyledHeaderUserMenu>
            <StyledHeaderOverlay active={isMenuOpen} onClick={handleClick}/>
        </StyledHeaderUser>
        }
        </>
    )
};

export default HeaderUser;
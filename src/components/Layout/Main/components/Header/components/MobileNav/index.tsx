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
                        <svg
                            width="42"
                            height="36"
                            viewBox="0 0 42 36"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <path
                                    d="M16.0441426,32 C7.18320732,32 0,24.836556 0,16 C0,7.163444 7.18320732,0 16.0441426,0 C24.9050779,0 32.0882852,7.163444 32.0882852,16 C32.0882852,24.836556 24.9050779,32 16.0441426,32 Z M16.0976231,24 C20.5576272,24 24.1731749,20.3943999 24.1731749,15.9466667 C24.1731749,11.4989335 20.5576272,7.89333333 16.0976231,7.89333333 C11.637619,7.89333333 8.02207131,11.4989335 8.02207131,15.9466667 C8.02207131,20.3943999 11.637619,24 16.0976231,24 Z"
                                    id="logo-full-a"
                                ></path>
                            </defs>
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g>
                                    <g>
                                        <g id="kolac">
                                            <circle
                                                id="Oval-6"
                                                fill="#FFFFFF"
                                                cx="17"
                                                cy="16"
                                                r="10"
                                            ></circle>
                                            <mask id="logo-full-mask-2" fill="white">
                                                <use></use>
                                            </mask>
                                            <use
                                                id="Mask"
                                                fillOpacity="0.899999976"
                                                fill="#D8D8D8"
                                            ></use>
                                            <polygon
                                                id="Path-3"
                                                fill="#FF6FAF"
                                                mask="url(#logo-full-mask-2)"
                                                points="16.0441426 -0.730175139 16.0441426 16 34.1063075 3.50918751 20.1480198 -1.99954922"
                                            ></polygon>
                                            <polygon
                                                id="Path-2"
                                                fill="#00BC7C"
                                                mask="url(#logo-full-mask-2)"
                                                points="16.0208188 15.9182456 33.203099 3.94707882 33.1075857 19.1213724 28.7682783 29.9200783 25.5198717 29.1580738"
                                            ></polygon>
                                            <polygon
                                                id="Path"
                                                fill="#FE5A61"
                                                mask="url(#logo-full-mask-2)"
                                                points="16.0271308 15.9631392 27.4612222 31.2990737 16.1347917 33.3051551 7.53311181 30.6943158"
                                            ></polygon>
                                            <polygon
                                                id="Path"
                                                fill="#40C3F9"
                                                mask="url(#logo-full-mask-2)"
                                                points="16.108472 15.983092 7.21072447 32.1073971 -0.343285929 24.242931 -0.0336416493 19.9513112"
                                            ></polygon>
                                            <polygon
                                                id="Path-4"
                                                fill="#FFC053"
                                                mask="url(#logo-full-mask-2)"
                                                points="16.0056939 15.9893866 -3.32432669 21.1437247 -1.16777337 9.79204291 6.02002312 0.477440478 16.0611917 -1.38576505"
                                            ></polygon>
                                            <ellipse
                                                id="Oval-2"
                                                fillOpacity="0.0900000036"
                                                fill="#000000"
                                                mask="url(#logo-full-mask-2)"
                                                cx="16.0441426"
                                                cy="16"
                                                rx="9.94736842"
                                                ry="9.92"
                                            ></ellipse>
                                        </g>
                                        <path
                                            d="M16.5624439,15.2679282 C18.3037122,15.7523532 18.9320883,16.2131781 18.9320883,17.6304318 C18.9320883,19.2582242 18.0203513,20.0587676 16.6577279,20.2084425 L16.6558596,21.192198 L15.4732171,21.192198 L15.4732171,20.2009898 C14.5029396,20.1183891 13.4548157,19.9084716 13.4548157,19.9084716 L13.5880888,18.8296943 C13.5880888,18.8296943 15.220372,19.0476856 16.0785507,19.0476856 C17.1067459,19.0476856 17.5781837,18.5874818 17.5781837,17.7148957 C17.5781837,17.0124794 17.2032755,16.7702669 15.933445,16.4671907 C14.1442234,16.0069869 13.3701188,15.4616982 13.3701188,14.0202232 C13.3701188,12.5352741 14.2388846,11.8247841 15.5940347,11.684425 L15.5940347,10.7733333 L16.7791683,10.7733333 L16.7791683,11.6862882 C17.727026,11.759573 18.7508619,11.9483746 18.7508619,11.9483746 L18.6418769,13.038952 C18.6418769,13.038952 16.9491848,12.845182 16.2479445,12.845182 C15.2322047,12.845182 14.7121907,13.2085007 14.7121907,13.9233382 C14.7121907,14.6984182 15.1475078,14.8803882 16.5624439,15.2679282 L16.5624439,15.2679282 Z"
                                            id="dolar"
                                            fill="#2A3E49"
                                        ></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
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
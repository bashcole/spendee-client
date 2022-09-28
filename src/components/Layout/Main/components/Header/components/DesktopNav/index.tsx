import React from 'react';
import Link from "next/link";
import {useTranslations} from "next-intl";

import {StyledHeaderNav, StyledHeaderNavItemLink, StyledHeaderNavList} from "@components/Layout/Main/components/Header/style";
import {INavItem} from "@store/index";
import UserMenu from "@components/Layout/Main/components/Header/components/UserMenu";

const DesktopNav = ({navItems}: {navItems: INavItem[]}) => {

    const t = useTranslations("Menu");

    return (
        <>
            <StyledHeaderNav>
                <StyledHeaderNavList>
                    {
                        navItems.map((navItem: INavItem) => (
                            <Link href={navItem.url} key={navItem.url} passHref={true}>
                                <StyledHeaderNavItemLink active={navItem.active}>{t(navItem.name)}</StyledHeaderNavItemLink>
                            </Link>
                        ))
                    }
                </StyledHeaderNavList>
            </StyledHeaderNav>

            <UserMenu/>
        </>
    )
}

export default DesktopNav;
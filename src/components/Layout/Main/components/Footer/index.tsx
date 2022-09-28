import type {NextPage} from 'next'
import {StyledFooter} from "@components/Layout/Main/components/Footer/style";
import {useTranslations} from "next-intl";

const Footer: NextPage = () => {
    const t = useTranslations("Footer")
    return (
        <StyledFooter>
            {t("copyright")}
        </StyledFooter>
    )
}

export default Footer

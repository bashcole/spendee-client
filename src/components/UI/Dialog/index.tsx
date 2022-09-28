import React, {useEffect} from 'react';
import {
    StyledBackdrop,
    StyledDialog,
    StyledDialogCloseButton,
    StyledDialogContent,
    StyledDialogHeader,
    StyledDialogTitle
} from "@components/UI/Dialog/style";
import {useTranslations} from "next-intl";

interface Props {
    isShown: boolean;
    onClose: any;
    title: string;
    width: string;
    children?: React.ReactNode;
}

const Dialog = ({isShown, onClose, children, title, width}: Props) => {

    const t = useTranslations("Shared");

    // @ts-ignore
    // useEffect(() => {
    //     if (isShown) {
    //         document.body.style.overflow = 'hidden';
    //     }
    //     return () => document.body.style.overflow = 'unset';
    // }, [isShown]);

    return (<>
        {isShown && (
            <>
                <StyledBackdrop onClick={onClose} data-testid="backdrop"/>
                <StyledDialogContent width={width}>
                    <StyledDialogHeader>
                        <StyledDialogTitle>{t(title)}</StyledDialogTitle>
                        <StyledDialogCloseButton onClick={onClose}>
                            <svg width="24" height="24"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </StyledDialogCloseButton>
                    </StyledDialogHeader>
                    {children}
                </StyledDialogContent>
            </>
        )}
    </>)
};

export default Dialog;
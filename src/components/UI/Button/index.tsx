import React from 'react';
import {StyledButton} from "@components/UI/Button/style";
import {variants} from "@constants/motion-variants";
import {scale} from "style-value-types";

interface Props {
    children?: React.ReactNode;
    onClick?: any;
    variant?: "white" | "green" | "red",
    scaled?: boolean,
    shadow?: boolean,
    block?: boolean,
    type?: "submit" | "reset" | "button" | undefined,
    disabled?: boolean,
}

const Button = ({children, onClick, variant, scaled, shadow, disabled, block, type, ...props}: Props) => {
    return (<StyledButton {...props} type={type} onClick={onClick} variant={variant} block={block} scaled={scaled} shadow={shadow} disabled={disabled}>
        {children}
    </StyledButton>)
}

export default Button;
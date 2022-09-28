import React from 'react';
import {StyledFormControl, StyledLabel, StyledInput, StyledSelect, StyledDateInputWrapper, StyledError} from "@components/UI/Form/style";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const FormControl = (props: any) => {
    return (<StyledFormControl {...props}>
        {props.children}
    </StyledFormControl>)
}

export const FormLabel = (props: any) => {
    return (<StyledLabel {...props}>
        {props.children}
    </StyledLabel>)
}

export const FormInput = (props: any) => {
    return (<StyledInput {...props}>
        {props.children}
    </StyledInput>)
}

export const FormSelect = (props: any) => {
    return (<StyledSelect {...props}>
        {props.children}
    </StyledSelect>)
}

export const FormDateInput = (props: any) => {
    return (<StyledDateInputWrapper {...props}>
        <DatePicker selected={props.selected} onChange={props.onChange}/>
    </StyledDateInputWrapper>)
}

export const FormError = (props: any) => {
    return (<StyledError {...props}>
        {props.children}
    </StyledError>)
}
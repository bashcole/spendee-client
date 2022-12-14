// @ts-nocheck
import {useTranslations} from 'next-intl';
import React, {useContext, useState} from 'react';
import {StyledColumn, StyledForm, StyledActions, StyledWrap, StyledFields} from './style'
import {FormControl, FormError, FormLabel} from "@components/UI/Form";
import Button from "@components/UI/Button";
import {ITransaction} from "@interfaces/transaction";
import {useForm, Controller} from "react-hook-form";
import DatePicker from "react-datepicker";
import SelectCategory from "@components/UI/SelectCategory";
import {ITransactionCategory} from "@interfaces/category";
import {createTransaction} from "@utils/index";
import {IPosition} from "@interfaces/position";
import Select from "react-select";
import WalletContext from "@contexts/wallet";
import {Spinner} from "@components/UI/LoadingScreen";

interface IProps {
    position: IPosition | undefined;
    onSubmit: any;
    onDelete?: any;
}

interface IFormInputs {
    category: ITransactionCategory;
    date: Date;
    units: number;
    currency: string;
    open: number;
}

const findDate = (position: IPosition | undefined) => {
    if (position) return new Date(position.createdAt)
    return new Date()
}

const PositionForm = ({position, onSubmit, onDelete}: IProps) => {

    const [isDeleting, setIsDeleting] = useState(false)
    const isAddMode = !position?._id;
    const t = useTranslations("Wallet");
    const [startDate, setStartDate] = useState(findDate(position));
    const {
        control,
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid, isDirty, isSubmitting}
    } = useForm<IFormInputs>({mode: "onChange"});


    // const startDate = findDate(position)
    const {currencies} = useContext(WalletContext)

    if(!currencies){
        return <></>
    }
    const portfolioCurrencies = currencies?.filter(currency => currency.type !== 'fiat')
    const handleDelete = async () => {
        console.log('delete')
    }
    const handleCreate = async () => {
        console.log('create new')
    }

    const handleCategorySelect = () => {
        console.log("handleCategorySelect")
    }

    return (
        <StyledWrap>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <StyledFields>
                    <StyledColumn>
                        <FormControl>
                            <FormLabel>{t("Date")}</FormLabel>

                            <Controller
                                defaultValue={startDate}
                                rules={{required: true}}
                                control={control}
                                name="date"
                                render={({ field: { onChange}}) => (
                                    <DatePicker selected={startDate} onChange={(date: Date) => {
                                        onChange(date)
                                        setStartDate(date)
                                    }}/>
                                )}
                            />
                            {errors.date && <FormError>Please select a date</FormError>}

                        </FormControl>
                    </StyledColumn>
                    <StyledColumn>
                    <FormControl>
                        <FormLabel>{t("Ticker")}</FormLabel>
                        <Controller
                            defaultValue={position?.currency}
                            rules={{required: true}}
                            control={control}
                            name="currency"
                            render={({ field: { onChange}}) => (
                                <>
                                    {/* @ts-ignore */}
                                    <Select
                                        defaultValue={position ? { label: `${position?.currency}`, value: position?.currency }: ''}
                                        placeholder={t("EmptySelect")}
                                        options={portfolioCurrencies?.map(opt => ({label: `${opt.ticker}: ${opt.name}`, value: opt.ticker}))}
                                        onChange={val => onChange(val.value)}
                                    />
                                </>

                            )}
                        />
                        {errors.currency && <FormError>{t("Please select a currency")}</FormError>}
                    </FormControl>
                    </StyledColumn>
                    <StyledColumn>
                        <FormControl>
                            <label>{t("Units")}</label>
                            <input defaultValue={position ? position.units: ''} id="units" step="any" type="number"
                                   placeholder={t("Your units")} {...register("units", {required: true})} />
                            {errors.units && <FormError>Please enter a valid units</FormError>}
                        </FormControl>
                    </StyledColumn>

                    <StyledColumn>
                        <FormControl>
                            <label>{t("Open")}</label>
                            <input defaultValue={position ? position.open: ''} id="open" step="any" type="number"
                                   placeholder={t("Your open")} {...register("open", {required: true})} />
                            {errors.open && <FormError>Please enter a valid open</FormError>}
                        </FormControl>
                    </StyledColumn>

                </StyledFields>
                <StyledActions>
                    {!isAddMode &&
                        <Button disabled={isDeleting} type="button" onClick={()=> {onDelete();setIsDeleting(true)}} variant="red" scaled={false}
                                shadow={true}>{isDeleting && <Spinner type="button"/>} {t("Delete")}</Button>}
                    <Button disabled={isSubmitting} type="submit" variant="green" scaled={false}
                            shadow={true}>{isSubmitting && <Spinner type="button"/>} {isAddMode ? t('Add position') : t('Save')}</Button>
                </StyledActions>
            </StyledForm>
        </StyledWrap>
    )
}

export default PositionForm;
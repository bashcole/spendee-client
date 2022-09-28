import React, {useContext, useState} from 'react';
import Dialog from "@components/UI/Dialog";
import {FormControl, FormError, FormLabel} from "@components/UI/Form";
import Select from 'react-select';
import useFetchCurrencies from "@hooks/useFetchCurrencies";
import Button from "@components/UI/Button";
import {createWallet} from "@utils/index";
import { useForm, Controller } from 'react-hook-form';
import {StyledErrorBadge} from "@components/UI/Form/style";
import {useTranslations} from "next-intl";
import {validate} from "@babel/types";
import WalletContext from "@contexts/wallet";

interface Props {
    isShown: boolean;
    onClose: any;
    onSuccess: any;
}

interface IFormInputs {
    name: string;
    currency: string;
    other_currency?: string;
    type: string;
}

const walletTypes = [
    {label: 'cash', value: 'cash'},
    {label: 'portfolio', value: 'portfolio'}
];

const Index = ({isShown, onClose, onSuccess}: Props) => {

    const [apiError, setApiError] = useState("");
    const {currencies} = useContext(WalletContext)

    const primaryCurrencies = currencies?.filter(currency => currency.primary === true)
    // console.log("PRIME")
    // console.log(currencies)
    const t = useTranslations("Shared");

    const onSubmit = async (data: any) => {
        console.log({
            "currency": data.currency,
            "otherCurrency": data.other_currency,
            "type": data.type,
            "name": data.name,
        })

        try {
            await createWallet(data)
            reset()
            onSuccess()
        } catch (e) {
            setApiError('Something went wrong')
        }
    }

    const onCloseOverride = () => {
        clearErrors()
        setApiError("")
        reset()
        onClose()
    }

    const {
        control,
        register,
        clearErrors,
        handleSubmit,
        reset,
        watch,
        formState: {errors}
    } = useForm<IFormInputs>({mode: "onChange"});

    let mainCurrency = watch("currency");
    console.log(mainCurrency)
    if(!currencies){
        return <>Bla</>
    }

    return (
        <Dialog width="420px" title="Add New Wallet" isShown={isShown} onClose={onCloseOverride}>
            <form onSubmit={handleSubmit(onSubmit)} data-testid="new_wallet_form">
                {apiError && <StyledErrorBadge>{t(apiError)}</StyledErrorBadge>}
                <FormControl>
                    <FormLabel>{t("Name")}</FormLabel>
                    <input data-testid="new_wallet_form_name" autoComplete="off" id="name" type="text" placeholder={t("Wallet name")} {...register("name", {
                        required: true
                    })} />
                    {errors.name && <FormError data-testid="new_wallet_form_name_error">{t("Please enter a wallet name")}</FormError>}
                </FormControl>

                <FormControl>
                    <FormLabel>{t("Currency")}</FormLabel>

                    <Controller
                        rules={{required: true}}
                        control={control}
                        name="currency"
                        render={({ field: { onChange}}) => (
                            <Select
                                placeholder={t("EmptySelect")}
                                options={currencies?.map(opt => ({label: opt.name, value: opt.ticker}))}
                                onChange={val => onChange(val?.value)}
                            />
                        )}
                    />
                    {errors.currency && <FormError data-testid="new_wallet_form_currency_error">{t("Please select a currency")}</FormError>}
                </FormControl>

                <FormControl>
                    <FormLabel>{t("Type")}</FormLabel>
                    <Controller
                        rules={{required: true}}
                        control={control}
                        name="type"
                        render={({ field: { onChange}}) => (
                            <Select
                                placeholder={t("EmptySelect")}
                                options={walletTypes}
                                onChange={val => onChange(val?.value)}
                            />
                        )}
                    />
                    {errors.type && <FormError data-testid="new_wallet_form_type_error">{t("Please select a type")}</FormError>}
                </FormControl>

                <FormControl>
                    <FormLabel>{t("Other currency")}</FormLabel>
                    <Controller
                        rules={{
                            validate: value => {
                                if(mainCurrency === undefined) return true;

                                if(mainCurrency === 'BGN' || value === 'BGN') return true;

                                return value === mainCurrency;

                            }
                        }}
                        control={control}
                        name="other_currency"
                        render={({ field: { onChange}}) => (
                            <Select
                                placeholder={t("EmptySelect")}
                                options={primaryCurrencies?.map(opt => ({label: opt.name, value: opt.ticker}))}
                                onChange={val => onChange(val?.value)}
                            />
                        )}
                    />
                    {errors.other_currency && <FormError data-testid="new_wallet_form_other_currency_error">{t("Please select a different currency than the main one")}</FormError>}
                </FormControl>

                {/*@ts-ignore*/}
                <Button variant="green" shadow={true} scaled={false} type="submit">{t("Save")}</Button>
            </form>
        </Dialog>
    )
}

export default Index;
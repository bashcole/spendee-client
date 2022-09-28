import {useTranslations} from 'next-intl';
import React, {useState} from 'react';
import {StyledColumn, StyledForm, StyledActions, StyledWrap, StyledFields} from './style'
import {FormControl, FormError, FormLabel} from "@components/UI/Form";
import Button from "@components/UI/Button";
import {ITransaction} from "@interfaces/transaction";
import {useForm, Controller} from "react-hook-form";
import DatePicker from "react-datepicker";
import SelectCategory from "@components/UI/SelectCategory";
import {ITransactionCategory} from "@interfaces/category";
import {createTransaction} from "@utils/index";

interface IProps {
    transaction: ITransaction | undefined;
    onSubmit: any;
    onDelete?: any;
}

interface IFormInputs {
    category: ITransactionCategory;
    note: string;
    date: Date;
    amount: string;
}

const findDate = (transaction: ITransaction | undefined) => {
    if (transaction) return new Date(transaction.createdAt)
    return new Date()
}

const TransactionForm = ({transaction, onSubmit, onDelete}: IProps) => {

    const isAddMode = !transaction?._id;
    const t = useTranslations("Wallet");
    const [startDate, setStartDate] = useState(findDate(transaction));

    const handleDelete = async () => {
        console.log('delete')
    }
    const handleCreate = async () => {
        console.log('create new')
    }

    const handleCategorySelect = () => {
        console.log("handleCategorySelect")
    }

    const {
        control,
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid, isDirty}
    } = useForm<IFormInputs>({mode: "onChange"});

    // const onSubmitHandle = async (data: IFormInputs) => {
    //     console.log("onSubmit")
    //     onSubmit(data)
    //
    //     // createTransaction(data)
    // }

    return (
        <StyledWrap>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <StyledFields>
                    <StyledColumn>

                        <Controller
                            defaultValue={transaction?.category}
                            rules={{required: true}}
                            control={control}
                            name="category"
                            render={({ field: { onChange}}) => (
                                <SelectCategory defaultValue={transaction?.category} onChange={(val: ITransactionCategory) => onChange(val)}/>
                            )}
                        />
                        {errors.category && <FormError>Please select a category</FormError>}

                    </StyledColumn>
                    <StyledColumn>
                        <FormControl>
                            <FormLabel>{t("Date")}</FormLabel>

                            <Controller
                                defaultValue={startDate}
                                rules={{required: true}}
                                control={control}
                                name="date"
                                render={({ field: { onChange}}) => (
                                    <DatePicker selected={startDate} onChange={(date: Date) =>  {
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
                            <label>{t("Note")}</label>
                            <input autoComplete="off" defaultValue={transaction?.note} id="note" type="text"
                                   placeholder="Your note" {...register("note")} />
                        </FormControl>
                    </StyledColumn>

                    <StyledColumn>
                        <FormControl>
                            <label>{t("Amount")}</label>
                            <input autoComplete="off" defaultValue={transaction ? transaction.amount / 100: ''} id="amount" type="text"
                                   placeholder="Your amount" {...register("amount", {required: true})} />
                            {errors.amount && <FormError>Please enter a valid amount</FormError>}
                        </FormControl>
                    </StyledColumn>

                </StyledFields>
                <StyledActions>
                    {!isAddMode &&
                        <Button type="button" onClick={onDelete} variant="red" scaled={false}
                                shadow={true}>{t("Delete")}</Button>}
                    <Button type="submit" variant="green" scaled={false}
                            shadow={true}>{isAddMode ? t('Add transaction') : t('Save')}</Button>
                </StyledActions>
            </StyledForm>
        </StyledWrap>
    )
}

export default TransactionForm;
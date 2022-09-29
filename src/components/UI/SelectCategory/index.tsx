import React, {useContext, useState} from 'react';
import {FormControl} from "@components/UI/Form";
import {useTranslations} from "next-intl";
import {
    NoneSelected,
    Popout,
    Wrap,
    Types,
    Type,
    Categories,
    StyledSelectedWrap,
    StyledSelecedCategoryItem,
    StyledCategoryIconSmall
} from './style'
import {ITransactionCategory} from "@interfaces/category";
import WalletContext from "@contexts/wallet";
import {
    StyledCategoryColumn,
    StyledCategoryIcon, StyledCategoryItem,
    StyledCategoryName
} from "@components/Section/variants/TransactionsSection/components/Transaction/style";
interface IProps {
    onChange?: any;
    defaultValue?: any;
}

const SelectCategory = ({onChange, defaultValue}: IProps) => {

    const {categories} = useContext(WalletContext)
    const t = useTranslations("Wallet");
    const [type, setType] = useState("expense")
    const [showCategories, setShowCategories] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState(defaultValue ? defaultValue : null)

    if(!categories){
        return <FormControl>
            <label>{t("Select category")}2</label>
        </FormControl>
    }

    const _categories = categories.filter(category => category.type === type)

    const toggleShowCategories = () => {
        setShowCategories(prevState => !prevState)
        setType('expense')
    }

    const handleCategorySelect = (category: ITransactionCategory) => {
        onChange({...category, id: category._id})
        setSelectedCategory(category)
        setShowCategories(false)
        setType('')
    }

    return (<>
        <FormControl>
            <label>{t("Select category")}</label>
            {!selectedCategory &&
                <NoneSelected onClick={() => toggleShowCategories()}>{t("Select category")}</NoneSelected>
            }

            {selectedCategory && <StyledSelectedWrap>
                <StyledSelecedCategoryItem onClick={() => toggleShowCategories()}>
                    <StyledCategoryIconSmall color={selectedCategory.hex}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={selectedCategory.icon} alt={"..."}/>
                    </StyledCategoryIconSmall>
                    <StyledCategoryName>{selectedCategory.name}</StyledCategoryName>
                </StyledSelecedCategoryItem>
            </StyledSelectedWrap>
            }

            {showCategories && _categories && <Wrap>
                <Popout>
                    <Types>
                        <Type type='income' active={type === 'income'} onClick={() => setType('income')}>{t("Income")}</Type>
                        <Type type='expense' active={type === 'expense'} onClick={() => setType('expense')}>{t("Expense")}</Type>
                    </Types>
                    <Categories>
                        {_categories && _categories.map(category => (
                            <StyledCategoryItem key={category._id} onClick={() => handleCategorySelect(category)}>
                                <StyledCategoryIcon color={category.hex}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={category.icon} alt={"..."}/>
                                </StyledCategoryIcon>
                                <StyledCategoryName>
                                    {category.name}
                                </StyledCategoryName>
                            </StyledCategoryItem>
                        ))}
                    </Categories>
                </Popout>
            </Wrap>}
        </FormControl>
    </>)
}

export default SelectCategory;
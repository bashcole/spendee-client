import {useRouter} from 'next/router'
import Seo from "@components/Seo";
import {useDispatch} from "react-redux";
import {StyledForm} from "@components/UI/Form/style";
import {uiActions} from "@store/reducers/ui-slice";
import React, {useEffect} from "react";
import {fetchTranslations} from "@services/translations";
import MotionWrap from "@components/UI/Motion";
import {FormControl, FormError, FormInput, FormLabel} from "@components/UI/Form";
import Button from "@components/UI/Button";
import {deleteWallet, editWallet} from "@utils/index";
import useFetchWallet from "@hooks/useFetchWallet";
import Section from "@components/Section";
import withAuth from "@components/HOC/withAuth";
import {useForm} from "react-hook-form";
import WalletService from "@services/wallet"
import Skeleton from "react-loading-skeleton";
import {mutate} from "swr";
import {walletSettingsNavigation} from "@constants/navigation";

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = async ({locale}: { locale: string }) => {

    return {
        props: {
            messages: await fetchTranslations(locale),
            "title": "Edit wallet...",
        }
    }
}

interface IFormInputs {
    name: string;
}

const WalletSettings = () => {
    const router = useRouter()
    const {id} = router.query
    const dispatch = useDispatch()
    const {wallet} = useFetchWallet(id)
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<IFormInputs>({mode: "onChange"});

    if (wallet) {
        console.log('its here?')
    }

    useEffect(() => {
        dispatch(uiActions.setNavItems(walletSettingsNavigation(`${id}`)))
        console.log("settings effect")
    }, [dispatch, id])

    const onDelete = () => {
        if (confirm("Are you sure you want to delete the wallet?")) {
            deleteWallet(`${id}`).then(r => {
                router.push('/').then(r => '');
            })
        }

    }

    const onSubmit = async (data: IFormInputs) => {

        console.log({
            "name": data.name,
        })

        try {
            await WalletService.update(id, {
                name: data.name
            })

            await router.push(`/wallet/${id}`);
            await mutate(`/wallet/${id}`)
        } catch (e) {
            console.log(e)
        }

    }

    if (!wallet) {
        return <Skeleton/>
    }

    return (
        <>
            <Seo title="Wallet Settings"/>
            <MotionWrap>
                <Section title="Settings">
                    <StyledForm onSubmit={handleSubmit(onSubmit)}>
                        <FormControl>
                            <label htmlFor={"name"}>Name</label>
                            <input defaultValue={wallet?.name} autoComplete="off" id="name" type="text"
                                   placeholder="Wallet name" {...register("name", {
                                required: true
                            })} />
                            {errors.name && <FormError>Please enter a wallet name</FormError>}
                        </FormControl>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Button type="submit" variant="green" shadow={true} scaled={false}
                                    disabled={!isValid}>Save</Button>
                            <Button type="button" variant="red" shadow={true} scaled={false}
                                    onClick={onDelete}>Delete</Button>
                        </div>
                    </StyledForm>

                </Section>
            </MotionWrap>
        </>
    )
}

// @ts-ignore
export default withAuth(WalletSettings)
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

import Button from "@components/UI/Button";
import {publicRequest} from "@services/axios";
import {fetchTranslations} from "@services/translations";
import {authActions} from "@store/reducers/auth-slice";
import {uiActions} from "@store/reducers/ui-slice";
import MotionWrap from "@components/UI/Motion";
import Seo from "@components/Seo";
import {FormControl, FormError} from "@components/UI/Form";
import {StyledForm} from "@components/UI/Form/style";
import AuthCard from "@components/Card/variants/AuthCard";
import {StyledHeadingTitle} from "@components/Card/variants/AuthCard/style";
import {isValidEmail} from "@utils/validations";
import {StyledErrorBadge} from "@components/UI/Form/style";
import withGuest from "@components/HOC/withGuest";
import {Spinner} from "@components/UI/LoadingScreen";

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = async ({locale}: { locale: string }) => {

    return {
        props: {
            messages: await fetchTranslations(locale),
        }
    }
}

interface IFormInputs {
    email: string;
    password: string;
}

const Login = () => {

    const [apiError, setApiError] = useState("");
    const router = useRouter();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authActions.setUser({}))
        dispatch(authActions.setAuth(false))
        dispatch(uiActions.hideMenu())
        dispatch(uiActions.setNavItems([]))
    }, [dispatch])

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid, isDirty, isSubmitting}
    } = useForm<IFormInputs>({mode: "onChange"});
    const onSubmit = async (data: IFormInputs) => {

        try {
            // AuthService.login(data)
            const res = await publicRequest.post('/users/login', {
                email: data.email,
                password: data.password
            })

            dispatch(authActions.setUser(res.data))
            localStorage.setItem('user_info', JSON.stringify(res.data))
            await router.push('/');
        } catch (error) {
            setApiError('Wrong credentials');
        }

    }

    return (
        <>
            <Seo title="Login"/>

            <MotionWrap>
                <AuthCard>
                    <StyledHeadingTitle><strong>Login</strong> to Spendee</StyledHeadingTitle>

                    <StyledForm onSubmit={handleSubmit(onSubmit)} data-testid="login-form">
                        {apiError && <StyledErrorBadge>{apiError}</StyledErrorBadge>}
                        <FormControl>
                            <label htmlFor={"email"}>Email</label>
                            <input data-testid="login-email" defaultValue="" id="email" type="text" placeholder="Your email address" {...register("email", {
                                required: true,
                                validate: isValidEmail
                            })} />
                            {errors.email && <FormError data-testid="login-email-error">Please enter a valid email</FormError>}
                        </FormControl>
                        <FormControl>
                            <label htmlFor="password">Password</label>
                            <input data-testid="login-password" defaultValue="" id="password" type="password"
                                   placeholder="Your password" {...register("password", {required: true, minLength: 6})} />
                            {errors.password && <FormError data-testid="login-password-error">Please enter a password</FormError>}
                        </FormControl>

                        <Button data-testid="login-submit" variant="green" shadow={true} scaled={false} disabled={!isDirty || !isValid || isSubmitting}>{isSubmitting && <Spinner type="button"/>} Login
                            to Spendee</Button>
                    </StyledForm>

                </AuthCard>
            </MotionWrap>
        </>
    )
}

// @ts-ignore
export default withGuest(Login)
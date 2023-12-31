'use client';
import axios from 'axios';
import React, { useState, useCallback } from 'react';
import {
    useForm,
    FieldValues,
    SubmitHandler
} from 'react-hook-form';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import AuthSocialButton from './AuthSocialButton';
import { error } from 'console';
import { toast } from 'react-hot-toast/headless';
import { signIn } from 'next-auth/react';
import { callbackify } from 'util';
type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);
    // react hook form
    const { register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // console.log(data);
        setLoading(true);
        if (variant == 'REGISTER') {
            // access register
            // 1. set post route using axios data=fieldValues
            axios.post('/api/register',data)
            .catch(()=>{
                toast.error("Something went wrong")
            })
        }
        if (variant == 'LOGIN') {
            // NextAuth sign In
            // set signin into next Auth
            signIn('credentials',{
                ...data,
                redirect:false
            }).then((callback)=>{
                // console.log(callback)
                if(callback?.error){
                    toast.error("Invalid credential")
                }
                if(callback?.ok && !callback?.error){
                    // toast.success("Logged In")
                    alert("Logged in")
                }
            })
        }
    }
    const socialAction = (action: string) => {
        setLoading(true);
        // NextAuth Social signIn
    }

    return (
        <div className="
            mt-8 
            sm:mx-auto 
            sm:w-full 
            sm:max-w-md
        ">
            <div className="
                bg-white
                px-4
                py-8
                shadow
                sm:rounded-lg
                sm:px-10
            ">
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (
                        <Input
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            id="name"
                            label="Name"
                        />
                    )}
                    <Input
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        id="email"
                        label="Email address"
                        type="email"

                    />
                    <Input
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        id="password"
                        label="Password"
                        type="password"
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>

                {/*  Divider  */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="
                            absolute 
                            inset-0 
                            flex 
                            items-center
                            "
                        >
                            <div className="
                                    w-full 
                                    border-t
                                    border-gray-300"
                            />
                        </div>
                        <div className="
                            relative 
                            flex 
                            justify-center 
                            text-sm
                            "
                        >
                            <span className="
                                    bg-white 
                                    px-2 
                                    text-gray-500
                                    "
                            >
                                Or continue with
                            </span>
                        </div>
                    </div>
                </div>
                {/* Social Login */}
                <div className="
                      mt-6 flex 
                      gap-2
                ">
                    <AuthSocialButton
                        icon={BsGithub}
                        onClick={() => socialAction('github')}
                    />
                    <AuthSocialButton
                        icon={BsGoogle}
                        onClick={() => socialAction('google')}
                    />
                </div>
                {/* Or create a new */}
                <div className="
                        flex 
                        gap-2 
                        justify-center 
                        text-sm 
                        mt-6 
                        px-2 
                        text-gray-500
                        "
                >
                    <div>
                        {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
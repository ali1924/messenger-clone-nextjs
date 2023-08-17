'use client';
import React, { useState, useCallback } from 'react';
import {
    useForm,
    FieldValues,
    SubmitHandler
} from 'react-hook-form';
import Input from '@/app/components/inputs/Input';
type Variant = 'Login' | 'Register';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('Login');
    const [isLoading, setLoading] = useState(false);

    const toggleVariant = useCallback(
        () => {
            if (variant === 'Login') {
                setVariant('Register');
            } else {
                setVariant('Login');
            }
        },
        [variant],
    );
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
        setLoading(true);
        if (variant == 'Register') {
            // access register
        }
        if (variant == 'Login') {
            // NextAuth sign In
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
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
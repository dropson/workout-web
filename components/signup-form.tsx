'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { useAuth } from '@/app/modules/auth/hooks/use-auth'
import { useState } from "react"
import { useRouter } from "next/navigation"
interface RegisterFormData {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
    const router = useRouter();
    const { register: registerUser, isLoading } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const password = watch('password');

    const onSubmit = async (data: RegisterFormData) => {
        try {
            setError(null)
            await registerUser({
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                password: data.password,
                password_confirmation: data.confirmPassword
            })
            window.location.href = '/profile';
        } catch (err) {
            setError('Registration failed. Please try again.')
        }
    }

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <div className="flex gap-3">
                            <Field>
                                <FieldLabel htmlFor="first-name">First Name</FieldLabel>
                                <Input
                                    id="first-name"
                                    type="text"
                                    placeholder="John"
                                    {...register('firstName', {
                                        required: 'Required',
                                    })}
                                />
                                {errors.firstName && (
                                    <FieldDescription className="text-red-500">
                                        {errors.firstName.message}
                                    </FieldDescription>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
                                <Input
                                    id="last-name"
                                    type="text"
                                    placeholder="Doe"
                                    {...register('lastName', {
                                        required: 'Required',
                                    })}
                                />
                                {errors.lastName && (
                                    <FieldDescription className="text-red-500">
                                        {errors.lastName.message}
                                    </FieldDescription>
                                )}
                            </Field>
                        </div>
                        {/* Email */}
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register('email', {
                                    required: 'Email is required',
                                })}
                            />
                            {errors.email && (
                                <FieldDescription className="text-red-500">
                                    {errors.email.message}
                                </FieldDescription>
                            )}
                        </Field>
                        {/* Password */}
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>

                            <Input
                                id="password"
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 4,
                                        message: 'Password must be at least 4 characters',
                                    },
                                })}
                            />

                            {errors.password && (
                                <FieldDescription className="text-red-500">
                                    {errors.password.message}
                                </FieldDescription>
                            )}
                        </Field>
                        {/* Confirm Password */}
                        <Field>
                            <FieldLabel htmlFor="password-confirm">Confirm Password</FieldLabel>

                            <Input
                                id="password-confirm"
                                type="password"
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: (value) => value === password || 'Passwords do not match',
                                })}
                            />

                            {errors.confirmPassword && (
                                <FieldDescription className="text-red-500">
                                    {errors.confirmPassword.message}
                                </FieldDescription>
                            )}
                        </Field>
                        <FieldGroup>
                            <Field>

                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? 'creating...' : 'Create Account'}
                                </Button>
                                <FieldDescription className="px-6 text-center">
                                    Already have an account? <a href="#">Sign in</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}

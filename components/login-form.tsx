'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/app/modules/auth/hooks/use-auth'
import { useState } from 'react'
interface LoginFormData {
    email: string
    password: string
}

interface LoginFormProps extends React.ComponentProps<'div'> { }


export function LoginForm({ className, ...props }: LoginFormProps) {
    const { login, isLoading } = useAuth()
    const [serverError, setServerError] = useState<string | null>(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        defaultValues: {
            email: 'test@example.com',
            password: 'password',
        },
    })

    const onSubmit = async (data: LoginFormData) => {
        try {
            setServerError(null)
            await login(data)
        } catch (error) {
            console.log('Login failed')
        }
    }

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            {/* EMAIL */}
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

                            {/* PASSWORD */}
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Link
                                        href="#"
                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>

                                <Input
                                    id="password"
                                    type="password"
                                    {...register('password', {
                                        required: 'Password is required',
                                    })}
                                />

                                {errors.password && (
                                    <FieldDescription className="text-red-500">
                                        {errors.password.message}
                                    </FieldDescription>
                                )}
                            </Field>

                            {/* ACTIONS */}
                            <Field>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </Button>

                                <FieldDescription className="text-center">
                                    Don&apos;t have an account?{' '}
                                    <Link href="/auth/signup" className="underline">
                                        Sign up
                                    </Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

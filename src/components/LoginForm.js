"use client";
import LoginService from '@/services/LoginService';
import { Button, Card, TextInput, Divider } from '@tremor/react';
import React, { useEffect } from 'react';
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { useAppData } from '@/app/contexts/AppProvider';
import { useTranslation } from 'react-i18next';

const GoogleIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z" />
  </svg>
);


export default function LoginForm() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const { t } = useTranslation();

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-10 lg:px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h3 className="text-center text-gb-title font-semibold text-gb-primary-400 dark:text-gb-primary-300">
                    {t('login.header')}
                </h3>
                <form action="#" method="post"  onSubmit={handleLogin} className="mt-6 space-y-4">
                <div>
                    <label
                    htmlFor="email"
                    className="text-gb-default font-medium text-gb-content-strong dark:text-gray-300"
                    >
                        {t('login.email')} 
                    </label>
                    <TextInput
                    // type="email"
                    error={error}
                    errorMessage={errorMessage}
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder={t('login.email_placeholder')}
                    className="mt-2 rounded-md"
                    onValueChange={(value) => {
                        setError(false);
                        setUsername(value)
                    }}
                    />
                </div>
                <div>
                    <label
                    htmlFor="password"
                    className="text-gb-default font-medium text-gb-content-strong dark:text-gray-300"
                    >
                        {t('login.password')}
                    </label>
                    <TextInput
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="password"
                    placeholder={t('login.password').toLowerCase()}
                    className="mt-2 rounded-md"
                    onValueChange={(value) => setPassword(value)}
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 w-full whitespace-nowrap rounded-gb-default py-2 text-center text-gb-default font-medium text-gb-primary-100 rounded-sm hover:text-gb-secondary-100 shadow-gb-input bg-gb-primary hover:bg-gb-secondary-600 dark:hover:bg-gb-secondary-700 dark:bg-gb-primary dark:text-gb-primary-100 dark:hover:text-gb-secondary-100"
                >
                    {t('login.login')}
                </button>
                </form>
                {/* <Divider>or with</Divider>
                <a
                href="#"
                className="flex w-full items-center justify-center space-x-2 rounded-gb-default border border-gb-border bg-gb-background py-2 text-gb-content-strong shadow-gb-input hover:bg-gb-background-subtle dark:border-dark-gb-border dark:bg-dark-gb-background dark:text-gray-300" dark:shadow-dark-gb-input dark:hover:bg-dark-gb-background-subtle"
                >
                <GoogleIcon className="size-5" aria-hidden={true} />
                <span className="text-gb-default font-medium">
                    Sign in with Google
                </span>
                </a> */}
                <p className="mt-4 text-gb-label text-gb-content dark:text-dark-gb-content">
                    {t('login.terms')}
                <a href="#" className="underline underline-offset-4">
                    {t('login.terms2')}
                </a>{' '}
                    {t('login.and')}{' '}
                <a href="#" className="underline underline-offset-4">
                    {t('login.privacy')}
                </a>
                .
                </p>
            </div>
            </div>
        </>        
    );
    // return (
    //     <Card className="mx-auto max-w-md my-auto top-[50%] rounded-md border-0">
    //         <form method="GET" onSubmit={handleLogin}>
    //             <h1 className='text-gb-brand-faint'> Login </h1>
    //             <TextInput placeholder='Username' label="Username" onValueChange={(value) => setUsername(value)} className='rounded-md my-5' />
    //             <TextInput placeholder='Password' label="Password" onValueChange={(value) => setPassword(value)} type="password" className='rounded-md my-5' />
    //             <Button type='submit' className=''>Login</Button>
    //         </form>
    //     </Card>
    // );

    async function handleLogin(event) {
        event.preventDefault(); // Prevent default form submission behavior
        
        try {
            // Regex check if username is email
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)){
                setError(true);
                setErrorMessage('Invalid email');
                // alert('Invalid email format');
                return;
            }
            await LoginService.logout(); // Logout the user if they are already logged in
            const response = await LoginService.checkUser(username.toLowerCase(), password);

            if (response.status === 200) {
                // setUser(response.data); 
                window.location.href = "/";
            }
        } catch (error) {
            // In case of no response
            if (error.code === "ERR_NETWORK") {
                setError(true); 
                setErrorMessage('Server is not responding');
            // In case of 403 response (Unauthorized)
            } else if (error.response.status === 403) {
                setError(true);
                setErrorMessage('Invalid username or password');
            } else {
                setError(true);
                setErrorMessage('An unknown error occurred ' + error.response.status);
            }

        }
    }
}





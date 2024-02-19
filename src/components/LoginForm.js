import LoginService from '@/services/LoginService';
import { Button, Card, TextInput } from '@tremor/react';
import React from 'react';

export default function LoginForm() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    return (
        <Card className="mx-auto max-w-md my-auto top-[50%] rounded-md border-0">
            <form onSubmit={handleLogin}>
                <h1 className='text-tremor-brand-faint'> Login </h1>
                <TextInput placeholder='Username' label="Username" onValueChange={(value) => setUsername(value)} className='rounded-md my-5' />
                <TextInput placeholder='Password' label="Password" onValueChange={(value) => setPassword(value)} type="password" className='rounded-md my-5' />
                <Button type='submit' className=''>Login</Button>
            </form>
        </Card>
    );

    function handleLogin() {
        var res = false; 
        LoginService.checkUser(username, password).then(response => {
            res = response.data === "User logged in successfully!";
            // Redirect to the home page if the user is authenticated
            if(res === true) window.location.href = "/";
            // Show an error message if the user is not authenticated
            else alert('Invalid username or password');
        
        }).catch(function (error) {
            console.log(error);
        });


    }
}





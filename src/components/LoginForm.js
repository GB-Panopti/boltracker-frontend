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

    async function handleLogin(event) {
        event.preventDefault(); // Prevent default form submission behavior
        
        try {
            const response = await LoginService.checkUser(username, password);
            const res = response.data === "User logged in successfully!";
            
            if (res) {
                window.location.href = "/"; // Redirect to the home page if the user is authenticated
            } else {
                console.log("Invalid username or password");
                alert('Invalid username or password'); // Show an error message if the user is not authenticated
            }
        } catch (error) {
            console.log(error);
            alert('Server error. Please try again later.');
        }
    }
}





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { toast } from "sonner"

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import { useAuth } from '@/context/AuthContext';
import { UserIcon, LockIcon } from 'lucide-react';

export function LoginForm() {
    const { updateAuthStatus } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'username' | 'password') => {
        if (field === 'username') setUsername(e.target.value);
        if (field === 'password') setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("/api/authx/login/", { username, password }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            updateAuthStatus(true);
            toast.success("Successfully logged in")
            navigate('/');
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                if (err.response && err.response.status === 401) {
                    toast.error("Invalid credentials. Please try again.")
                } else {
                    toast.error("An error occurred. Please try again later.");
                }
            } else {
                toast.error("Unknown error occurred")
            }
        }
    };

return (
    <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md">
            <Tabs defaultValue="login">
                <CardHeader>
                    <TabsList className="flex space-x-1">
                        <TabsTrigger value="login" className="flex-1">
                            Login
                        </TabsTrigger>
                        <TabsTrigger value="register" className="flex-1">
                            Register
                        </TabsTrigger>
                    </TabsList>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4 min-h-[20em]">
                    <TabsContent value="login">
                        <CardTitle>Login</CardTitle>
                        <br />
                        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                            <div className="space-y-6 flex-1">
                                <div className="relative">
                                    <UserIcon className="absolute left-0 inset-y-0 my-auto ml-3" />
                                    <Input id="username" type="text" value={username} onChange={(e) => handleChange(e, 'username')} required className="pl-10 mt-1" placeholder="Username" />
                                </div>
                                <div className="relative">
                                    <LockIcon className="absolute left-0 inset-y-0 my-auto ml-3" />
                                    <Input id="password" type="password" value={password} onChange={(e) => handleChange(e, 'password')} required className="pl-10 mt-1" placeholder="Password" />
                                </div>
                            </div>
                            <CardFooter>
                                <Button type="submit" className="w-full mt-4 mt-12">Log In</Button>
                            </CardFooter>
                        </form>
                    </TabsContent>
                    <TabsContent value="register" className="flex flex-col flex-1">
                        <CardTitle className="mb-5">Register</CardTitle>
                        <CardDescription>
                            Contact Infrastructure to get registered
                        </CardDescription>
                    </TabsContent>
                </CardContent>
            </Tabs>
        </Card>
    </div>
);

}
export default LoginForm;

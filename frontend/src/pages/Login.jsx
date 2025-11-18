import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import Main from "@/components/Main";

export default function Login() {
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleLogin = async data => {
        try {
            console.log("Login attempt:", data);

            // Simulate server request
            await new Promise(resolve => setTimeout(resolve, 500));

            // Place your actual authentication logic here
            toast.success("Login successful!");
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed");
        }
    };

    const handleError = (errors) => {
        console.log("Validation errors:", errors);
        toast.error("Login failed");
    };

    return (
        <Main>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLogin, handleError)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Digite seu email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Digite sua senha" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full mt-2">
                                Entrar
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </Main>
    );
}
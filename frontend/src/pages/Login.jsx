import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import Main from "@/components/Main";

export default function Login() {
    const { login, loading, error } = useAuth();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleLogin = async (data) => {
        const result = await login(data);

        if (!result) {
            toast.error(error || "Falha no login");
            return;
        }

        toast.success("Login realizado com sucesso!");
        form.reset();
    };

    const handleError = (errors) => {
        console.log("Validation errors:", errors);
        toast.error("Login inválido");
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
                                            <Input type="email" placeholder="Digite seu email" autoComplete="username" {...field} />
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
                                            <Input type="password" placeholder="Digite sua senha" autoComplete="current-password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full mt-2" disabled={loading}>
                                {loading ? "Entrando..." : "Entrar"}
                            </Button>
                        </form>

                        <p className="text-center text-zinc-800 m-5">Não sou cadastrado. <a href="/register" className="text-zinc-900 hover:underline">Cadastrar-se agora</a></p>
                    </Form>
                </CardContent>
            </Card>
        </Main>
    );
}
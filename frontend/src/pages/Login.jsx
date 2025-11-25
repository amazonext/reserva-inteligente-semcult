import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/utils/schemas/user.schema";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

export default function LoginForm({ onSwitchView, isFlipping }) {
    const { login, loading, error } = useAuth();

    const form = useForm({
        resolver: yupResolver(loginSchema),
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin, handleError)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Digite seu email" autoComplete="username" {...field} disabled={loading || isFlipping} />
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
                                <Input type="password" placeholder="Digite sua senha" autoComplete="current-password" {...field} disabled={loading || isFlipping} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full mt-2" disabled={loading || isFlipping}>
                    {loading ? "Entrando..." : "Entrar"}
                </Button>
            </form>

            <p className="text-center text-zinc-700 m-5">Não sou cadastrado. <a onClick={onSwitchView} className="text-zinc-900 hover:underline cursor-pointer">Cadastrar-se agora</a></p>
        </Form>
    );
}
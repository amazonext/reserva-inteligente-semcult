import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/utils/schemas/user.schema";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

export default function RegisterForm({ onSwitchView, isFlipping }) {
    const { register: registerAuth, loading, error } = useAuth();

    const form = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (dados) => {
        const result = await registerAuth(dados);

        if (!result) {
            toast.error(error || "Erro ao cadastrar");
            return;
        }

        toast.success("Cadastro realizado com sucesso!");
        form.reset();
    };

    const onError = (errors) => {
        console.log("Erros de validação:", errors);
        toast.error("Erro ao cadastrar");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite seu nome" autoComplete="username"  {...field} disabled={loading || isFlipping} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Digite seu email" autoComplete="current-email" {...field} disabled={loading || isFlipping} />
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
                    {loading ? "Cadastrando..." : "Cadastrar-se"}
                </Button>
            </form>

            <p className="text-center text-zinc-700 m-5">Já sou cadastrado. <a onClick={onSwitchView} className="text-zinc-900 hover:underline cursor-pointer">Entrar agora</a></p>
        </Form>
    );
}
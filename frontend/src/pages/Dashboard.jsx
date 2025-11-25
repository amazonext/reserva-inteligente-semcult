"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventSchema } from "@/utils/schemas/event.schema";

import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/DateTimePicker";

export default function Dashboard() {
    const form = useForm({
        resolver: yupResolver(eventSchema),
        defaultValues: {
            title: "",
            description: "",
            start_time: null,
            end_time: null,
            location: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:8000/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Falha ao criar evento");

            const result = await response.json();
            console.log("Evento criado:", result);
            form.reset();
        } catch (err) {
            console.error("Erro ao criar evento:", err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Agendar Evento Cultural</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Título</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Nome do evento"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            console.log("Título alterado:", e.target.value);
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Descrição do evento"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            console.log("Descrição alterada:", e.target.value);
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="start_time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data e Hora de Início</FormLabel>
                                <FormControl>
                                    <DateTimePicker
                                        control={form.control}
                                        name="start_time"
                                        label="Início"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="end_time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data e Hora de Fim</FormLabel>
                                <FormControl>
                                    <DateTimePicker
                                        control={form.control}
                                        name="end_time"
                                        label="Fim"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Local</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Local do evento"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            console.log("Local alterado:", e.target.value);
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full mt-4">Agendar</Button>
                </form>
            </Form>
        </div>
    );
}
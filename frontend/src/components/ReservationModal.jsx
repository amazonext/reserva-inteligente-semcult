import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventSchema } from "@/utils/schemas/event.schema";
import { useNavigate } from "react-router-dom";

import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/DateTimePicker";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { InputGroup } from "@/components/ui/input-group";

import EventConfirmationDialog from "./EventConfirmationDialog";

export default function ReservationModal({ children }) {
    const navigate = useNavigate();

    const form = useForm({
        resolver: yupResolver(eventSchema),
        defaultValues: {
            title: "",
            description: "",
            start_time: null,
            end_time: null,
            location: "",
            capacity: "",
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
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Solicitação de reserva de espaço</DialogTitle>
                    <DialogDescription>
                        Preencha os dados abaixo para solicitar um agendamento.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Nome do evento" />
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
                                        <Input {...field} placeholder="Descrição do evento" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Input Group aplicado no campo Capacidade */}
                        <FormField
                            control={form.control}
                            name="capacity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Capacidade</FormLabel>
                                    <FormControl>
                                        <InputGroup>
                                            <Input {...field} type="number" placeholder="Capacidade do evento" />
                                            <span className="px-3 bg-gray-200 rounded-r-md text-gray-700 flex items-center h-full">pessoas</span>
                                        </InputGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="start_time"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Data e Hora de Início</FormLabel>
                                    <FormControl>
                                        <DateTimePicker control={form.control} name="start_time" label="Início" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="end_time"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Data e Hora de Fim</FormLabel>
                                    <FormControl>
                                        <DateTimePicker control={form.control} name="end_time" label="Fim" />
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione o local" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Estação das Docas">Estação das Docas</SelectItem>
                                                <SelectItem value="Mangal das Garças">Mangal das Garças</SelectItem>
                                                <SelectItem value="Mercado Ver-o-Peso">Mercado Ver-o-Peso</SelectItem>
                                                <SelectItem value="Basílica de Nazaré">Basílica de Nazaré</SelectItem>
                                                <SelectItem value="Theatro da Paz">Theatro da Paz</SelectItem>
                                                <SelectItem value="Forte do Presépio">Forte do Presépio</SelectItem>
                                                <SelectItem value="Ilha do Combu">Ilha do Combu</SelectItem>
                                                <SelectItem value="Museu Paraense Emílio Goeldi">Museu Paraense Emílio Goeldi</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => navigate("/reservations")}>
                                Cancelar
                            </Button>
                            <Button type="submit">Solicitar agendamento</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
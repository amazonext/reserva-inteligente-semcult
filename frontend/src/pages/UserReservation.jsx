import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { requestEventSchema } from "@/schemas/requestEvent.schema";
import { useRequest } from "@/hooks/useRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, CalendarPlus, FileText, Type, Clock, User } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateTimePicker } from "@/components/DateTimePicker";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";

export default function UserReservation() {
    const { createRequest, loading, error } = useRequest();
    const navigate = useNavigate();

    const form = useForm({
        resolver: yupResolver(requestEventSchema),
        defaultValues: {
            requester_name: "João da Silva",
            requester_cpf: "123.456.789-00",
            title: "Workshop de Fotografia",
            description: "Aprendizado sobre técnicas de fotografia, equipamentos e edição.",
            start_time: new Date(),
            end_time: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2h depois
            location_name: "Estação das Docas",
            capacity: 50,
        },
    });

    const { errors } = form.formState;

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            start_time: data.start_time ? new Date(data.start_time).toISOString() : null,
            end_time: data.end_time ? new Date(data.end_time).toISOString() : null,
        };

        console.log("Payload enviado:", payload);

        const result = await createRequest(payload);
        console.log(result);

        if (result) {
            toast.success("Solicitação enviada com sucesso!", {
                description: `Obrigado, ${data.requester_name}. Seu pedido será analisado pela equipe.`,
                duration: 5000,
            });
            navigate("/");
        } else {
            toast.error("Falha ao enviar a solicitação. Tente novamente.");
        }
    };

    const formatCPF = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    };

    const getInputClass = (fieldName) =>
        `bg-white border ${errors[fieldName] ? "border-red-500" : "border-zinc-300"} rounded-md focus:ring-1 focus:ring-primary focus:border-primary w-full`;

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 relative overflow-x-hidden">
            <div className="container mx-auto px-4 py-8 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 max-w-2xl"
                >
                    <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-zinc-900 mb-2">
                        Solicitar Reserva
                    </h1>
                    <p className="text-lg text-zinc-600">
                        Preencha o formulário abaixo para requisitar o uso de um dos espaços culturais de Belém.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-full max-w-3xl"
                >
                    <Card className="shadow-2xl border-none bg-white/80 backdrop-blur-sm">
                        <CardHeader className="border-b border-zinc-100 pb-6 relative">
                            <div className="flex items-center justify-center w-full relative">
                                <div className="absolute left-0">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => navigate("/")}
                                        className="-ml-2 text-zinc-500 hover:text-primary hover:bg-primary/10"
                                        title="Voltar"
                                    >
                                        <ArrowLeft className="h-5 w-5" />
                                    </Button>
                                </div>
                                <div className="text-center">
                                    <CardTitle className="text-xl text-zinc-800">Detalhes da Solicitação</CardTitle>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="pt-8 px-6 md:px-8">
                            <Form {...form}>
                                <form id="public-reservation-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Solicitante */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                                            <User className="w-4 h-4" /> Dados do Solicitante
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            <div className="md:col-span-2">
                                                <FormField
                                                    control={form.control}
                                                    name="requester_name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Nome Completo</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} placeholder="Digite seu nome completo" className={getInputClass("requester_name")} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="requester_cpf"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>CPF</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <FileText className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                                                    <Input
                                                                        {...field}
                                                                        maxLength={14}
                                                                        placeholder="000.000.000-00"
                                                                        onChange={(e) => field.onChange(formatCPF(e.target.value))}
                                                                        className={`${getInputClass("requester_cpf")} pl-9`}
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Evento */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                                            <CalendarPlus className="w-4 h-4" /> Dados do Evento
                                        </h3>
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Título do Evento</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Type className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                                            <Input {...field} placeholder="Ex: Workshop de Fotografia" className={`${getInputClass("title")} pl-9`} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <FormField
                                                control={form.control}
                                                name="location_name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Espaço Desejado</FormLabel>
                                                        <FormControl>
                                                            <Select {...field} onValueChange={field.onChange}>
                                                                <SelectTrigger className={getInputClass("location_name")}>
                                                                    <SelectValue placeholder="Selecione o local" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Basílica de Nazaré">Basílica de Nazaré</SelectItem>
                                                                    <SelectItem value="Estação das Docas">Estação das Docas</SelectItem>
                                                                    <SelectItem value="Forte do Presépio">Forte do Presépio</SelectItem>
                                                                    <SelectItem value="Ilha do Combu">Ilha do Combu</SelectItem>
                                                                    <SelectItem value="Mangal das Garças">Mangal das Garças</SelectItem>
                                                                    <SelectItem value="Mercado Ver-o-Peso">Mercado Ver-o-Peso</SelectItem>
                                                                    <SelectItem value="Museu Paraense Emílio Goeldi">Museu Paraense Emílio Goeldi</SelectItem>
                                                                    <SelectItem value="Teatro da Paz">Teatro da Paz</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="capacity"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Público Estimado</FormLabel>
                                                        <FormControl>
                                                            <InputGroup>
                                                                <InputGroupInput
                                                                    {...field}
                                                                    type="number"
                                                                    placeholder="0"
                                                                    className={getInputClass("capacity")}
                                                                />
                                                                <InputGroupAddon align="inline-end" className="bg-zinc-50 text-zinc-500 px-3 border-l">
                                                                    pessoas
                                                                </InputGroupAddon>
                                                            </InputGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 bg-zinc-50/80 rounded-lg border border-zinc-100">
                                            <FormField
                                                control={form.control}
                                                name="start_time"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel className="flex items-center gap-2 mb-1">
                                                            <Clock className="h-3.5 w-3.5 text-primary" /> Início
                                                        </FormLabel>
                                                        <FormControl>
                                                            <DateTimePicker
                                                                {...field}
                                                                type="start"
                                                                className={getInputClass("start_time")}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="end_time"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel className="flex items-center gap-2 mb-1">
                                                            <Clock className="h-3.5 w-3.5 text-primary" /> Término
                                                        </FormLabel>
                                                        <FormControl>
                                                            <DateTimePicker
                                                                {...field}
                                                                type="end"
                                                                className={getInputClass("end_time")}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Descrição Detalhada</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            {...field}
                                                            placeholder="Descreva a finalidade do evento, necessidades técnicas e observações..."
                                                            className={`${getInputClass("description")} min-h-[120px] resize-y`}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                                </form>
                            </Form>
                        </CardContent>

                        <CardFooter className="bg-zinc-50 px-8 py-6 border-t border-zinc-100 flex flex-col md:flex-row gap-4 items-center">
                            <p className="text-xs text-zinc-500 text-center md:text-left flex-1">
                                Ao enviar, você concorda com os termos de uso dos espaços públicos da <b>SEMCULT</b>.
                            </p>
                            <div className="flex gap-3 w-full md:w-auto">
                                <Button variant="outline" onClick={() => navigate("/")} className="flex-1 md:flex-none">
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    form="public-reservation-form"
                                    className="flex-1 md:flex-none min-w-[150px] font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30"
                                    disabled={loading || form.formState.isSubmitting}
                                >
                                    {loading || form.formState.isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
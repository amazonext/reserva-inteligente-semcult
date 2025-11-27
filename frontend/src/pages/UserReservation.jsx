import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventSchema } from "@/utils/schemas/event.schema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, CalendarPlus, FileText, Type, Users, Clock, User } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardFooter 
} from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateTimePicker } from "@/components/DateTimePicker";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";

const publicRequestSchema = eventSchema.shape({
    requester_name: yup.string().required("Por favor, informe seu nome completo"),
    requester_cpf: yup.string()
        .required("O CPF é obrigatório")
        .min(14, "O CPF deve estar completo") 
        .max(14, "O CPF deve estar completo"),
    capacity: yup.number()
        .transform((value, originalValue) => originalValue === "" ? null : value) 
        .typeError("Informe apenas números válidos") 
        .required("O público estimado é obrigatório")
        .positive("O público deve ser maior que zero")
        .integer("Informe um número inteiro"),
});

export default function UserReservation() {
    const navigate = useNavigate();

    const form = useForm({
        resolver: yupResolver(publicRequestSchema),
        defaultValues: {
            requester_name: "",
            requester_cpf: "",
            title: "",
            description: "",
            start_time: null,
            end_time: null,
            location: "",
            capacity: "", 
        },
    });

    const onSubmit = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log("Solicitação Pública:", data);
        
        toast.success("Solicitação enviada com sucesso!", {
            description: `Obrigado, ${data.requester_name}. Seu pedido será analisado pela equipe.`,
            duration: 5000,
        });
        
        navigate("/");
    };
    const formatCPF = (value) => {
        return value
            .replace(/\D/g, '') 
            .replace(/(\d{3})(\d)/, '$1.$2') 
            .replace(/(\d{3})(\d)/, '$1.$2') 
            .replace(/(\d{3})(\d{1,2})/, '$1-$2') 
            .replace(/(-\d{2})\d+?$/, '$1'); 
    };

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 relative overflow-x-hidden">
            <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-br from-zinc-100 to-zinc-300 -z-10" />
            <div className="absolute top-[250px] left-0 w-full h-32 -z-10 opacity-60">
                <svg className="waves w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave-form" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use href="#gentle-wave-form" x="48" y="7" fill="rgba(255,255,255,0.7)" />
                        <use href="#gentle-wave-form" x="48" y="0" fill="rgba(255,255,255,1)" />
                    </g>
                </svg>
            </div>

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
                                        title="Voltar ao início"
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
                                                                <Input 
                                                                    placeholder="Digite seu nome completo" 
                                                                    className="bg-white" 
                                                                    autoFocus
                                                                    {...field} 
                                                                />
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
                                                            <FormLabel>CPF </FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <FileText className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                                                    <Input 
                                                                        placeholder="000.000.000-00" 
                                                                        className="bg-white pl-9" 
                                                                        maxLength={14}
                                                                        {...field}
                                                                        onChange={(e) => {
                                                                            const formatted = formatCPF(e.target.value);
                                                                            field.onChange(formatted);
                                                                        }}
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

                                    <div className="h-px bg-zinc-100 my-2" />
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
                                                            <Input placeholder="Ex: Workshop de Fotografia" className="bg-white pl-9" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <FormField
                                                control={form.control}
                                                name="location"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Espaço Desejado</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="bg-white">
                                                                    <SelectValue placeholder="Selecione o local" />
                                                                </SelectTrigger>
                                                            </FormControl>
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
                                                                    type="number" 
                                                                    placeholder="0" 
                                                                    className="bg-white"
                                                                    {...field} 
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
                                                                control={form.control}
                                                                name="start_time"
                                                                label=""
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
                                                                control={form.control}
                                                                name="end_time"
                                                                label=""
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
                                                            placeholder="Descreva a finalidade do evento, necessidades técnicas e observações..." 
                                                            className="min-h-[120px] bg-white resize-y"
                                                            {...field} 
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </form>
                            </Form>
                        </CardContent>

                        <CardFooter className="bg-zinc-50 px-8 py-6 border-t border-zinc-100 flex flex-col md:flex-row gap-4 items-center">
                            <p className="text-xs text-zinc-500 text-center md:text-left flex-1">
                                Ao enviar, você concorda com os termos de uso dos espaços públicos da SEMCULT.
                            </p>
                            <div className="flex gap-3 w-full md:w-auto">
                                <Button 
                                    variant="outline" 
                                    onClick={() => navigate("/")}
                                    className="flex-1 md:flex-none"
                                >
                                    Cancelar
                                </Button>
                                <Button 
                                    type="submit" 
                                    form="public-reservation-form"
                                    className="flex-1 md:flex-none min-w-[150px] font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30"
                                    disabled={form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </motion.div>

                <div className="mt-12 text-zinc-400 text-sm">
                    &copy; {new Date().getFullYear()} Sistema de Reservas SEMCULT
                </div>
            </div>
        </div>
    );
}
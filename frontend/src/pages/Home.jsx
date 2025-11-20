import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CalendarDays, BarChart3, Users, ArrowRight } from "lucide-react";

const features = [
    {
        icon: <FileText className="w-8 h-8 text-primary" />,
        title: "Gestão de Reservas",
        description: "Solicite, aprove, reprove e gerencie todas as reservas de espaços culturais em um único lugar.",
    },
    {
        icon: <CalendarDays className="w-8 h-8 text-primary" />,
        title: "Agenda Inteligente",
        description: "Visualize a disponibilidade dos espaços com uma agenda completa com filtros diário, semanal e mensal.",
    },
    {
        icon: <BarChart3 className="w-8 h-8 text-primary" />,
        title: "Relatórios Detalhados",
        description: "Gere relatórios por período, espaço e status para ajudar na tomada de decisões.",
    },
    {
        icon: <Users className="w-8 h-8 text-primary" />,
        title: "Perfis de Acesso",
        description: "Controle de acesso com perfis distintos para usuários, gestores e administradores do sistema.",
    },
];

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-gray-50 font-sans text-gray-800">
            <header className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-100 to-gray-300 overflow-hidden">
                <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
                    <motion.div
                        className="lg:w-1/2 p-8 text-center lg:text-left z-10"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-primary font-semibold mb-2">
                            Parceria com a Secretaria de Cultura de Belém
                        </p>
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 font-heading tracking-tight">
                            Reserva Inteligente SEMCULT
                        </h1>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            A plataforma para gerenciar as reservas dos espaços culturais de Belém.
                            Centralize a gestão de forma simples e moderna.
                        </p>
                    </motion.div>
                    
                    <motion.div
                        className="lg:w-auto z-10"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Card className="shadow-2xl w-full max-w-sm">
                            <CardContent className="p-8 text-center flex flex-col items-center justify-center gap-6">
                                <p className="text-md text-gray-700">
                                    Acesse sua conta ou cadastre-se para começar a utilizar a plataforma.
                                </p>
                                <div className="flex flex-col gap-4 w-full">
                                    <Button onClick={() => navigate("/login")} size="lg" className="w-full">Login</Button>
                                    <Button onClick={() => navigate("/register")} size="lg" variant="outline" className="w-full">
                                        Registrar
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-48">
                    <svg className="waves w-full h-full" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use href="#gentle-wave" x="48" y="7" />
                        </g>
                    </svg>
                </div>
            </header>

            <section className="py-24 px-4 bg-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold font-heading text-gray-900 mb-16">Recursos da Plataforma</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-50 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold font-heading mb-2 text-gray-900">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-4">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold font-heading text-gray-900 mb-16">Como Funciona?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">1</div>
                            <div>
                                <h3 className="text-xl font-bold font-heading mb-2">Cadastre-se</h3>
                                <p className="text-gray-600">Crie sua conta para ter acesso à plataforma de reservas.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">2</div>
                            <div>
                                <h3 className="text-xl font-bold font-heading mb-2">Solicite uma Reserva</h3>
                                <p className="text-gray-600">Navegue pelos espaços e preencha o formulário de solicitação.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">3</div>
                            <div>
                                <h3 className="text-xl font-bold font-heading mb-2">Aguarde a Aprovação</h3>
                                <p className="text-gray-600">Seu pedido será analisado por um gestor e você será notificado sobre o status.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-4 bg-gray-800 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold font-heading mb-4">Pronto para otimizar a gestão dos espaços culturais?</h2>
                    <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Transforme a maneira como os espaços culturais de Belém são gerenciados.</p>
                    <Button onClick={() => navigate("/register")} size="lg" className="py-6 px-8 text-lg font-bold bg-white text-primary hover:bg-gray-200">
                        Comece Agora <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </section>

            <footer className="py-6 px-4 bg-gray-900 text-gray-400">
                <div className="container mx-auto text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} AmazoNext. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
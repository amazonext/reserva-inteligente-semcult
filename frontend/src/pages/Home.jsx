import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CalendarDays, BarChart3, Users, Mail, Github, ArrowRight, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

import logoPrefeitura from "@/assets/images/logo-prefeitura.png";
import LoginForm from "@/components/Login";
import RegisterForm from "@/components/Register";

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

const steps = [
    {
        number: 1,
        title: "Cadastre-se",
        description: "Crie sua conta para ter acesso à plataforma de reservas."
    },
    {
        number: 2,
        title: "Solicite uma Reserva",
        description: "Navegue pelos espaços e preencha o formulário de solicitação."
    },
    {
        number: 3,
        title: "Aguarde a Aprovação",
        description: "Seu pedido será analisado por um gestor e você será notificado sobre o status."
    }
];

export default function Home() {
    const navigate = useNavigate();
    const [isRegisterView, setIsRegisterView] = useState(false);
    const [isFlipping, setIsFlipping] = useState(false);

    const toggleView = () => {
        setIsFlipping(true);
        setTimeout(() => {
            setIsRegisterView(prev => !prev);
            setIsFlipping(false);
        }, 400);
    };

    return (
        <div className="w-full bg-zinc-50 font-sans text-zinc-800">
            <header className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 bg-linear-to-br from-zinc-100 to-zinc-300 overflow-hidden" id="form">
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
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-zinc-900 mb-4 font-heading tracking-tight">
                            Reserva Inteligente SEMCULT
                        </h1>
                        <p className="text-lg text-zinc-700 leading-relaxed">
                            A plataforma para gerenciar as reservas dos espaços culturais de Belém.
                            Centralize a gestão de forma simples e moderna.
                        </p>
                    </motion.div>

                    <motion.div
                        className="lg:w-auto z-10 perspective-1000"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.div
                            className="relative w-full max-w-sm"
                            style={{
                                transformStyle: "preserve-3d",
                                width: "100%",
                            }}
                            animate={{ rotateY: isRegisterView ? 180 : 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Frente: Card de Login */}
                            <Card className="shadow-2xl w-full absolute backface-hidden">
                                <CardHeader>
                                    <CardTitle className="text-2xl text-center">Login</CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 text-center flex flex-col items-center justify-center gap-6">
                                    <p className="text-md text-zinc-700">
                                        Acesse sua conta para começar a utilizar a plataforma.
                                    </p>
                                    <LoginForm onSwitchView={toggleView} isFlipping={isFlipping} />
                                </CardContent>
                            </Card>

                            {/* Verso: Card de Cadastro */}
                            <Card className="shadow-2xl w-full backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
                                <CardHeader>
                                    <CardTitle className="text-2xl text-center">Cadastro</CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 text-center flex flex-col items-center justify-center gap-6">
                                    <p className="text-md text-zinc-700">
                                        Cadastre-se para ter acesso à plataforma de reservas.
                                    </p>
                                    <RegisterForm onSwitchView={toggleView} isFlipping={isFlipping} />
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-48">
                    <svg className="waves w-full h-full" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
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
                    <h2 className="text-4xl font-bold font-heading text-zinc-900 mb-16">Recursos da Plataforma</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-zinc-50 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold font-heading mb-2 text-zinc-900">{feature.title}</h3>
                                <p className="text-zinc-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-zinc-100 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                <div className="container mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-zinc-900">
                            Sobre nós
                        </h2>
                        <p className="text-lg md:text-xl text-zinc-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Conheça mais sobre nossa missão e a tecnologia por trás do projeto.
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button 
                                onClick={() => navigate("/about")} 
                                size="lg" 
                                className="px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                Conheça o Projeto <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 px-4">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold font-heading text-zinc-900 mb-16">Como Funciona?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {steps.map(({ number, title, description }) => (
                            <div key={number} className="flex items-start gap-4">
                                <div className="shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                                    {number}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-heading mb-2">{title}</h3>
                                    <p className="text-zinc-600">{description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-4 bg-zinc-800 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold font-heading mb-4">Pronto para otimizar a gestão dos espaços culturais?</h2>
                    <p className="text-lg text-zinc-300 max-w-2xl mx-auto">Transforme a maneira como os espaços culturais de Belém são gerenciados.</p>
                </div>
            </section>

            <footer className="bg-zinc-900 text-zinc-400">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex-shrink-0">
                            <img src={logoPrefeitura} alt="Logo da Prefeitura de Belém" className="h-16" />
                        </div>

                        <div className="text-center md:text-left text-sm">
                            <p>&copy; {new Date().getFullYear()} AmazoNext. Todos os direitos reservados.</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <a href="mailto:contato@amazonext.com" title="Enviar E-mail" className="text-zinc-400 hover:text-primary transition-colors">
                                <Mail className="w-6 h-6" />
                            </a>
                            <a href="https://github.com/AmazoNext/reserva-inteligente-semcult" target="_blank" rel="noopener noreferrer" title="Ver no GitHub" className="text-zinc-400 hover:text-primary transition-colors">
                                <Github className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
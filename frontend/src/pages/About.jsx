import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Code, 
    Server, 
    Database, 
    GitBranch, 
    Award, 
    Zap, 
    Cloud, 
    ArrowLeft 
} from "lucide-react";

export default function About() {
    const navigate = useNavigate();

    
    const objectives = [
        {
            icon: <Zap className="w-6 h-6 text-primary" />,
            title: "Digitalização",
            description: "Centralizar a gestão de reservas da SEMCULT, eliminando processos manuais e aumentando a eficiência."
        },
        {
            icon: <Cloud className="w-6 h-6 text-primary" />,
            title: "Indústria 4.0",
            description: "Aplicação prática de conceitos modernos de Cloud e desenvolvimento de software em um cenário real."
        },
        {
            icon: <Award className="w-6 h-6 text-primary" />,
            title: "Impacto Real",
            description: "Uma solução desenvolvida por acadêmicos para resolver dores reais da administração pública de Belém."
        }
    ];

    const techStack = [
        { name: "Frontend", tools: "React, Tailwind, HTML5", icon: <Code className="w-5 h-5" /> },
        { name: "Backend", tools: "Python, FastAPI, Django", icon: <Server className="w-5 h-5" /> },
        { name: "Banco de Dados", tools: "PostgreSQL", icon: <Database className="w-5 h-5" /> },
        { name: "Infraestrutura", tools: "Docker, Git", icon: <GitBranch className="w-5 h-5" /> },
    ];

    return (
        <div className="w-full bg-gray-50 font-sans text-gray-800">
            <header className="relative py-20 px-4 bg-gradient-to-br from-gray-100 to-gray-300 overflow-hidden">
                <div className="container mx-auto text-center z-10 relative">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-primary font-semibold mb-4 tracking-wide uppercase text-sm">
                            Institucional
                        </p>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 font-heading">
                            Sobre o Projeto
                        </h1>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                            O Sistema de Reservas Inteligente é fruto de uma parceria entre a 
                            Faculdade Estácio Nazaré e a Secretaria Municipal de Cultura e Turismo de Belém.
                        </p>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-24 lg:h-32">
                    <svg className="waves w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use href="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.7)" />
                            <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,1)" />
                        </g>
                    </svg>
                </div>
            </header>

            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold font-heading text-gray-900">Nosso Propósito</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {objectives.map((obj, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow bg-gray-50">
                                    <CardHeader>
                                        <div className="mb-2 bg-white w-12 h-12 rounded-lg flex items-center justify-center shadow-sm">
                                            {obj.icon}
                                        </div>
                                        <CardTitle className="text-xl font-bold text-gray-900">{obj.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 leading-relaxed">
                                            {obj.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 bg-gray-50">
                <div className="container mx-auto max-w-4xl">
                    <motion.div 
                        className="text-center mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Stack Tecnológica</h2>
                        <p className="text-gray-600">
                            Ferramentas modernas utilizadas para garantir performance e segurança.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {techStack.map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary/30 transition-colors"
                            >
                                <div className="mr-4 p-3 bg-gray-100 rounded-full text-primary">
                                    {tech.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{tech.name}</h3>
                                    <p className="text-sm text-gray-500">{tech.tools}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 px-4 bg-white text-center">
                <div className="container mx-auto">
                    <Button 
                        onClick={() => navigate("/")} 
                        variant="outline" 
                        size="lg" 
                        className="group"
                    >
                        <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Voltar para o Início
                    </Button>
                    
                    <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Desenvolvido por alunos da Faculdade Estácio.</p>
                        <p className="mt-2 text-xs">Licença MIT</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
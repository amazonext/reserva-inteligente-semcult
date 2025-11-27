import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Server, Database, GitBranch, Award, Zap, Cloud, ArrowLeft, Github, Instagram } from "lucide-react";

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
            title: "Inovação Tecnológica",
            description: "Aplicação prática de conceitos modernos de Cloud e desenvolvimento de software em um cenário real."
        },
        {
            icon: <Award className="w-6 h-6 text-primary" />,
            title: "Impacto Real",
            description: "Uma solução desenvolvida por acadêmicos para resolver dores reais da administração pública de Belém."
        }
    ];

    const techStack = [
        { name: "Frontend", tools: "React, Tailwind", icon: <Code className="w-5 h-5" /> },
        { name: "Backend", tools: "Python, FastAPI", icon: <Server className="w-5 h-5" /> },
        { name: "Banco de Dados", tools: "PostgreSQL", icon: <Database className="w-5 h-5" /> },
        { name: "Infraestrutura", tools: "Supabase", icon: <GitBranch className="w-5 h-5" /> },
    ];

    return (
        <div className="w-full bg-zinc-50 font-sans text-zinc-800">
            <header className="relative pt-20 pb-40 px-4 bg-linear-to-br from-zinc-100 to-zinc-300 overflow-hidden">
                <div className="container mx-auto text-center z-10 relative">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-primary font-semibold mb-4 tracking-wide uppercase text-sm">
                            Institucional
                        </p>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-zinc-900 mb-6 font-heading">
                            Sobre o Projeto
                        </h1>
                        <p className="text-lg text-zinc-700 max-w-3xl mx-auto leading-relaxed">
                            O <span className="font-semibold text-primary/80">Reserva Inteligente SEMCULT</span> é a plataforma desenvolvida para modernizar e centralizar a gestão de reservas dos principais espaços culturais de Belém. Este projeto inovador é fruto de uma parceria entre a Faculdade Estácio Nazaré e a Secretaria Municipal de Cultura e Turismo de Belém.
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
                        <h2 className="text-3xl font-bold font-heading text-zinc-900">Nosso Propósito</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {objectives.map((obj, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <Card className="h-full border-none shadow-lg transition-all bg-zinc-50">
                                    <CardHeader>
                                        <div className="mb-2 bg-white w-12 h-12 rounded-lg flex items-center justify-center shadow-sm">
                                            {obj.icon}
                                        </div>
                                        <CardTitle className="text-xl font-bold text-zinc-900">{obj.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-zinc-600 leading-relaxed">
                                            {obj.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 bg-zinc-100">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold font-heading text-zinc-900">Nossa História</h2>
                        </div>
                        <div className="space-y-6 text-lg text-zinc-700 leading-relaxed mb-8">
                            <p>
                                A <span className="text-primary font-medium">AmazoNext</span> nasceu da evolução. O que começou
                                em 2024 como um grupo de estudo e colaboração sob o nome de <span
                                className="text-primary font-medium">"The Heapsters"</span>, floresceu para se tornar um
                                coletivo focado em criar projetos de código aberto que causam impacto.
                            </p>
                            <p>
                                Nossa missão é explorar novas tecnologias, compartilhar conhecimento e contribuir para a
                                comunidade de desenvolvimento, sempre com um olhar para a qualidade e a inovação.
                            </p>
                        </div>
                        <div className="flex justify-center space-x-6 pt-4">
                            <motion.a 
                                href="https://github.com/AmazoNext/reserva-inteligente-semcult" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                title="Ver o Projeto no GitHub"
                                className="text-zinc-500 hover:text-zinc-900 transition-colors"
                                whileHover={{ scale: 1.1 }}
                            >
                                <Github className="w-8 h-8" />
                            </motion.a>
                            <motion.a 
                                href="https://instagram.com/amazonext.dev" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                title="Nosso Instagram"
                                className="text-zinc-500 hover:text-zinc-900 transition-colors"
                                whileHover={{ scale: 1.1 }}
                            >
                                <Instagram className="w-8 h-8" />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 px-4 bg-zinc-50">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold font-heading text-zinc-900 mb-4">Stack Tecnológica</h2>
                        <p className="text-zinc-600">
                            Ferramentas modernas utilizadas para garantir performance e segurança.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {techStack.map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="flex items-center p-6 bg-white rounded-xl shadow-sm border border-zinc-100 hover:border-primary/30 transition-colors cursor-pointer"
                            >
                                <div className="mr-4 p-3 bg-zinc-100 rounded-full text-primary">
                                    {tech.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-zinc-900">{tech.name}</h3>
                                    <p className="text-sm text-zinc-500">{tech.tools}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-24 px-4 bg-zinc-800 text-white">
                <div className="container mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl font-bold font-heading mb-4">Pronto para Conhecer?</h2>
                        <p className="text-lg text-zinc-300 max-w-2xl mx-auto">Explore a plataforma e descubra como a AmazoNext está revolucionando a gestão cultural de Belém.</p>
                        <div className="mt-8">
                            <Button
                                onClick={() => navigate("/")}
                                variant="default" 
                                size="lg"
                                className="group bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-8 py-6 text-lg font-bold shadow-lg hover:shadow-primary/30"
                            >
                                <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                Voltar para o Início
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
            <footer className="bg-zinc-900 text-zinc-400">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center text-sm">
                        <p>&copy; {new Date().getFullYear()} AmazoNext. Todos os direitos reservados.</p>
                        <p className="mt-2 text-xs">Desenvolvido com <span className="text-red-500">♥</span> e Licença MIT</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
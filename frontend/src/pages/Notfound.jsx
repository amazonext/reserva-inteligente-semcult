
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-zinc-50 font-sans text-zinc-800 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="container mx-auto px-4 text-center z-10 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="flex flex-col items-center"
                >

                    <h1 className="text-8xl font-extrabold text-zinc-900 mb-2 font-heading tracking-tighter">
                        404
                    </h1>

                    <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 mb-4">
                        Ops! Página não encontrada
                    </h2>

                    <p className="text-zinc-600 max-w-md mx-auto mb-8 text-lg leading-relaxed">
                        Parece que a página que você está tentando acessar não existe ou foi movida para outro endereço.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={() => navigate("/")}
                            size="lg"
                            className="px-8 py-6 text-lg shadow-lg hover:shadow-primary/20"
                        >
                            <ArrowLeft className="mr-2 w-5 h-5" />
                            Voltar ao Início
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 opacity-50 pointer-events-none">
                <svg className="waves w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave-404" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use href="#gentle-wave-404" x="48" y="7" fill="rgba(209, 213, 219, 0.3)" />
                        <use href="#gentle-wave-404" x="48" y="0" fill="rgba(209, 213, 219, 0.5)" />
                    </g>
                </svg>
            </div>
        </div>
    );
}
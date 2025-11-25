import React, { useState } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, Plus } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReservationCard } from "@/components/ReservationCard";
import { ReservationFilter } from "@/components/ReservationFilter";

export default function Reservations() {
    const [reservas, setReservas] = useState([]);
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const handleApprove = (id) => {
        setReservas(prev => prev.map(r => r.id === id ? { ...r, status: "approved" } : r));
        toast.success("Reserva aprovada com sucesso!");
    };

    const handleReject = (id) => {
        setReservas(prev => prev.map(r => r.id === id ? { ...r, status: "rejected" } : r));
        toast.info("Reserva reprovada.");
    };

    const filteredReservas = reservas.filter(r => {
        const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.requester.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "all" || r.status === filter;
        return matchesSearch && matchesFilter;
    });

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Gestão de Reservas</h1>
                        <p className="text-gray-500 mt-1">Visualize e gerencie as solicitações de espaços culturais.</p>
                    </div>
                    <Link to="/dashboard">
                        <Button className="shadow-lg hover:shadow-xl transition-all">
                            <Plus className="mr-2 h-4 w-4" /> Nova Solicitação
                        </Button>
                    </Link>
                </div>

                <ReservationFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} filter={filter} setFilter={setFilter} />

                <Card className="shadow-sm bg-primary text-primary-foreground">
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium opacity-90">Total de Solicitações</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-3xl font-bold">{reservas.length}</div>
                        <p className="text-xs opacity-70 mt-1">
                            {reservas.filter(r => r.status === 'pending').length} pendentes de análise
                        </p>
                    </CardContent>
                </Card>

                <ScrollArea className="h-[600px] rounded-lg border bg-white shadow-sm p-4">
                    <div className="grid grid-cols-1 gap-4">
                        {filteredReservas.length === 0 ? (
                            <div className="text-center py-20 text-gray-400">
                                <CalendarDays className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                <p>Nenhuma reserva encontrada.</p>
                            </div>
                        ) : (
                            filteredReservas.map((reserva, index) => (
                                <motion.div
                                    key={reserva.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <ReservationCard reserva={reserva} onApprove={handleApprove} onReject={handleReject} formatDate={formatDate} />
                                </motion.div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
    CalendarDays, 
    MapPin, 
    Clock, 
    CheckCircle, 
    XCircle, 
    MoreVertical, 
    Search, 
    Filter,
    Plus
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const MOCK_RESERVAS = [
    {
        id: 1,
        title: "Exposição de Arte Moderna",
        requester: "Ana Maria",
        date: new Date(2025, 10, 15),
        startTime: "14:00",
        endTime: "18:00",
        location: "Teatro da Paz - Salão Nobre",
        status: "pending",
        description: "Exposição de quadros de artistas locais."
    },
    {
        id: 2,
        title: "Workshop de Fotografia",
        requester: "Carlos Silva",
        date: new Date(2025, 10, 18),
        startTime: "09:00",
        endTime: "12:00",
        location: "Centro Cultural - Sala 2",
        status: "approved",
        description: "Workshop introdutório para jovens."
    },
    {
        id: 3,
        title: "Ensaio Orquestra Jovem",
        requester: "Mariana Costa",
        date: new Date(2025, 10, 20),
        startTime: "18:00",
        endTime: "21:00",
        location: "Teatro da Paz - Palco Principal",
        status: "rejected",
        description: "Ensaio geral para apresentação de natal."
    },
    {
        id: 4,
        title: "Palestra: Patrimônio Histórico",
        requester: "camila Rocha",
        date: new Date(2025, 10, 22),
        startTime: "19:00",
        endTime: "21:00",
        location: "Museu do Estado",
        status: "pending",
        description: "Palestra aberta ao público."
    },
];

const StatusBadge = ({ status }) => {
    const styles = {
        pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
        approved: "bg-green-100 text-green-700 border-green-200",
        rejected: "bg-red-100 text-red-700 border-red-200",
    };

    const labels = {
        pending: "Pendente",
        approved: "Aprovado",
        rejected: "Reprovado",
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}>
            {labels[status]}
        </span>
    );
};

export default function Reservations() {
    const [reservas, setReservas] = useState(MOCK_RESERVAS);
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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="md:col-span-3 shadow-sm">
                        <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative w-full md:flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                <Input 
                                    placeholder="Buscar por evento ou solicitante..." 
                                    className="pl-9 bg-gray-50/50 border-gray-200"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                                <Button 
                                    variant={filter === "all" ? "default" : "outline"} 
                                    onClick={() => setFilter("all")}
                                    className="flex-1"
                                >
                                    Todos
                                </Button>
                                <Button 
                                    variant={filter === "pending" ? "default" : "outline"} 
                                    onClick={() => setFilter("pending")}
                                    className="flex-1"
                                >
                                    Pendentes
                                </Button>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Filter className="h-4 w-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 p-2" align="end">
                                        <div className="grid gap-1">
                                            <Button variant="ghost" size="sm" onClick={() => setFilter("approved")} className="justify-start">Aprovados</Button>
                                            <Button variant="ghost" size="sm" onClick={() => setFilter("rejected")} className="justify-start">Reprovados</Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </CardContent>
                    </Card>

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
                </div>

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
                                    <Card className="overflow-hidden hover:shadow-md transition-shadow border-l-4" style={{ 
                                        borderLeftColor: 
                                            reserva.status === 'approved' ? 'var(--primary)' : 
                                            reserva.status === 'rejected' ? 'var(--destructive)' : 
                                            '#eab308'
                                    }}>
                                        <div className="flex flex-col md:flex-row justify-between">
                                            <div className="p-6 flex-1 space-y-3">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <h3 className="font-bold text-lg text-gray-900">{reserva.title}</h3>
                                                            <StatusBadge status={reserva.status} />
                                                        </div>
                                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                                            Solicitado por <span className="font-medium text-gray-700">{reserva.requester}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600 mt-2">
                                                    <div className="flex items-center gap-2">
                                                        <CalendarDays className="h-4 w-4 text-primary" />
                                                        {formatDate(reserva.date)}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 text-primary" />
                                                        {reserva.startTime} - {reserva.endTime}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4 text-primary" />
                                                        {reserva.location}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="bg-gray-50 p-6 flex items-center justify-end gap-2 md:border-l border-t md:border-t-0 border-gray-100 min-w-[200px]">
                                                {reserva.status === 'pending' ? (
                                                    <>
                                                        <Button 
                                                            size="sm" 
                                                            variant="outline" 
                                                            className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                                                            onClick={() => handleApprove(reserva.id)}
                                                        >
                                                            <CheckCircle className="h-4 w-4 mr-1" /> Aprovar
                                                        </Button>
                                                        <Button 
                                                            size="sm" 
                                                            variant="outline" 
                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                                            onClick={() => handleReject(reserva.id)}
                                                        >
                                                            <XCircle className="h-4 w-4 mr-1" /> Rejeitar
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Button variant="ghost" size="sm" disabled className="opacity-50">
                                                        <MoreVertical className="h-4 w-4 mr-1" /> Detalhes
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
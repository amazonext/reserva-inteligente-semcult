import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { CalendarDays } from "lucide-react";

import { EventCard } from "@/components/EventCard";
import { EventFilters } from "@/components/EventFilters";
import { EventStatsCard } from "@/components/EventStatsCard";

const EVENTS = [
    {
        id: "1",
        title: "Exposição de Arte Moderna",
        description: "Exposição de quadros de artistas locais.",
        category: "exposicao",
        location_name: "Teatro da Paz - Salão Nobre",
        start_time: new Date("2025-11-15T14:00:00-03:00"),
        end_time: new Date("2025-11-15T18:00:00-03:00"),
        is_all_day: false,
        requester_name: "João Silva",
        requester_cpf: "123.456.789-00",
        capacity: 50,
        is_public: "public",
        status: "pending",
        created_by: "00000000-0000-0000-0000-000000000001",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: "2",
        title: "Workshop de Fotografia",
        description: "Workshop introdutório para jovens.",
        category: "workshop",
        location_name: "Centro Cultural - Sala 2",
        start_time: new Date("2025-11-18T09:00:00-03:00"),
        end_time: new Date("2025-11-18T12:00:00-03:00"),
        is_all_day: false,
        requester_name: "Mariana Souza",
        requester_cpf: "987.654.321-00",
        capacity: 25,
        is_public: "public",
        status: "approved",
        created_by: "00000000-0000-0000-0000-000000000002",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: "3",
        title: "Ensaio Orquestra Jovem",
        description: "Ensaio geral para apresentação de natal.",
        category: "ensaio",
        location_name: "Teatro da Paz - Palco Principal",
        start_time: new Date("2025-11-20T18:00:00-03:00"),
        end_time: new Date("2025-11-20T21:00:00-03:00"),
        is_all_day: false,
        requester_name: "Carlos Mendes",
        requester_cpf: "321.654.987-00",
        capacity: 100,
        is_public: "private",
        status: "rejected",
        created_by: "00000000-0000-0000-0000-000000000003",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: "4",
        title: "Palestra: Patrimônio Histórico",
        description: "Palestra aberta ao público.",
        category: "palestra",
        location_name: "Museu do Estado",
        start_time: new Date("2025-11-22T19:00:00-03:00"),
        end_time: new Date("2025-11-22T21:00:00-03:00"),
        is_all_day: false,
        requester_name: "Ana Paula Brito",
        requester_cpf: "111.222.333-44",
        capacity: 200,
        is_public: "public",
        status: "pending",
        created_by: "00000000-0000-0000-0000-000000000004",
        created_at: new Date(),
        updated_at: new Date(),
    }
];

export default function Reservations() {
    const [events, setEvents] = useState(EVENTS);
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const handleApprove = (id) => {
        setEvents(prev => prev.map(e => e.id === id ? { ...e, status: "approved" } : e));
        toast.success("Evento aprovado!");
    };
    const handleReject = (id) => {
        setEvents(prev => prev.map(e => e.id === id ? { ...e, status: "rejected" } : e));
        toast.info("Evento rejeitado!");
    };

    const filteredEvents = events.filter(e => {
        const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || e.description.toLowerCase().includes(searchTerm.toLowerCase());
        return filter === "all" ? matchesSearch : matchesSearch && e.status === filter;
    });

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Gestão de Eventos</h1>
                        <p className="text-gray-500 mt-1">Visualize e gerencie os eventos culturais.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <EventFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} filter={filter} setFilter={setFilter} />
                    <EventStatsCard events={events} />
                </div>

                <ScrollArea className="h-[600px] rounded-lg border bg-white shadow-sm p-4">
                    <div className="grid grid-cols-1 gap-4">
                        {filteredEvents.length === 0 ? (
                            <div className="text-center py-20 text-gray-400">
                                <CalendarDays className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                <p>Nenhum evento encontrado.</p>
                            </div>
                        ) : (
                            filteredEvents.map(event => (
                                <EventCard key={event.id} event={event} onApprove={handleApprove} onReject={handleReject} />
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
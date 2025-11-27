/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock, CheckCircle, XCircle, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";

export const EventCard = ({ event, onApprove, onReject }) => {
    const formatDate = (date) => new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).format(date);
    const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow border-l-4"
                style={{
                    borderLeftColor:
                        event.status === "approved" ? "#16a34a" :
                            event.status === "rejected" ? "#dc2626" :
                                "#eab308"
                }}
            >
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="p-6 flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                            <h3 className="font-bold text-lg text-gray-900">{event.title}</h3>
                            <StatusBadge status={event.status} />
                        </div>
                        <p className="text-gray-600">{event.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-500 mt-2">
                            <div className="flex items-center gap-1"><CalendarDays className="h-4 w-4 text-primary" /> {formatDate(event.start_time)}</div>
                            <div className="flex items-center gap-1"><Clock className="h-4 w-4 text-primary" /> {formatTime(event.start_time)} - {formatTime(event.end_time)}</div>
                            <div className="flex items-center gap-1"><MapPin className="h-4 w-4 text-primary" /> {event.location_name}</div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Capacidade: {event.capacity} | Público: {event.is_public === "public" ? "Sim" : "Não"}</p>
                    </div>
                    <div className="bg-gray-50 p-6 flex items-center justify-end gap-2 md:border-l border-t md:border-t-0 border-gray-100 min-w-[200px]">
                        {event.status === "pending" ? (
                            <>
                                <Button size="sm" variant="outline" className="text-green-600 hover:bg-green-50 border-green-200" onClick={() => onApprove(event.id)}>
                                    <CheckCircle className="h-4 w-4 mr-1" /> Aprovar
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 border-red-200" onClick={() => onReject(event.id)}>
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
    );
};
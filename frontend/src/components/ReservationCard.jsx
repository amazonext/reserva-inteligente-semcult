import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Clock, CheckCircle, XCircle, MoreVertical } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

export const ReservationCard = ({ reserva, onApprove, onReject, formatDate }) => {
    return (
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
                                <h3 className="font-bold text-lg text-zinc-900">{reserva.title}</h3>
                                <StatusBadge status={reserva.status} />
                            </div>
                            <p className="text-sm text-zinc-500 flex items-center gap-1">
                                Solicitado por <span className="font-medium text-zinc-700">{reserva.requester}</span>
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-zinc-600 mt-2">
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

                <div className="bg-zinc-50 p-6 flex items-center justify-end gap-2 md:border-l border-t md:border-t-0 border-zinc-100 min-w-[200px]">
                    {reserva.status === 'pending' ? (
                        <>
                            <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200" onClick={() => onApprove(reserva.id)}>
                                <CheckCircle className="h-4 w-4 mr-1" /> Aprovar
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200" onClick={() => onReject(reserva.id)}>
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
    );
};
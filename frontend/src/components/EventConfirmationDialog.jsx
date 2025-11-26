import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function EventConfirmationDialog({ open, onOpenChange, eventData, onConfirm }) {
    if (!eventData) return null;

    const formatDateTime = (date) => {
        if (!date) return "";
        return new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(new Date(date));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Confirme os detalhes do evento</DialogTitle>
                    <DialogDescription>
                        <p>
                            O evento <strong>{eventData.title}</strong> vai acontecer em <strong>{eventData.location}</strong> no dia <strong>{formatDateTime(eventData.start_time)}</strong>, terminando em <strong>{formatDateTime(eventData.end_time)}</strong>.<br />
                            Capacidade: <strong>{eventData.capacity} pessoas</strong>.<br />
                            Descrição: {eventData.description}
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={onConfirm}>Confirmar agendamento</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
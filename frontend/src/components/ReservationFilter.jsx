import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Filter, Search } from "lucide-react";

export const ReservationFilter = ({ searchTerm, setSearchTerm, filter, setFilter }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3 flex flex-col md:flex-row items-center gap-4 p-4 bg-white shadow-sm rounded-md">
                <div className="relative w-full md:flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
                    <Input
                        placeholder="Buscar por evento ou solicitante..."
                        className="pl-9 bg-zinc-50/50 border-zinc-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} className="flex-1">
                        Todos
                    </Button>
                    <Button variant={filter === "pending" ? "default" : "outline"} onClick={() => setFilter("pending")} className="flex-1">
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
            </div>
        </div>
    );
};
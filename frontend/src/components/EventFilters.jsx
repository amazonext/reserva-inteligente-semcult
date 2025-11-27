import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "./ui/card";

export const EventFilters = ({ searchTerm, setSearchTerm, filter, setFilter }) => (
    <Card className="md:col-span-3 shadow-sm">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Buscar por evento..." className="pl-9 bg-gray-50/50 border-gray-200" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} className="flex-1">Todos</Button>
                <Button variant={filter === "pending" ? "default" : "outline"} onClick={() => setFilter("pending")} className="flex-1">Pendentes</Button>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2" align="end">
                        <div className="grid gap-1">
                            <Button variant="ghost" size="sm" onClick={() => setFilter("approved")} className="justify-start">Aprovados</Button>
                            <Button variant="ghost" size="sm" onClick={() => setFilter("rejected")} className="justify-start">Não aprovados</Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </CardContent>
    </Card>
);
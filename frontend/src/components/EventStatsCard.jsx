import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const EventStatsCard = ({ events }) => (
    <Card className="shadow-sm bg-primary text-primary-foreground">
        <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total de Eventos</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
            <div className="text-3xl font-bold">{events.length}</div>
            <p className="text-xs opacity-70 mt-1">{events.filter(e => e.status === 'pending').length} pendentes de análise</p>
        </CardContent>
    </Card>
);
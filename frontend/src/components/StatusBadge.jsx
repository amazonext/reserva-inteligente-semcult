import { Badge } from "@/components/ui/badge";

export const StatusBadge = ({ status }) => {
    const labels = {
        pending: "Pendente",
        approved: "Aprovado",
        rejected: "Não aprovado"
    };

    const colors = {
        pending: "bg-yellow-100 text-yellow-800",
        approved: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800"
    };

    const key = status || "pending";
    return (
        <Badge className={`px-2 py-1 rounded-full ${colors[key]}`}>
            {labels[key]}
        </Badge>
    );
};
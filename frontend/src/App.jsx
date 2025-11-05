import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function App() {
  const [status, setStatus] = useState({
    online: false,
    message: "Test pending",
  });

  const testBackendConnection = async () => {
    try {
      const response = await fetch("/api/test");
      if (!response.ok) {
        setStatus({ online: false, message: "Offline" });
        return;
      }

      const data = await response.json();
      console.log("Resposta do backend:", data);
      setStatus({ online: true, message: "Online" });
    } catch (error) {
      console.error("Falha na requisição:", error);
      setStatus({ online: false, message: "Offline" });
    }
  }

  const statusColor =
    status.message === "Test pending"
      ? "text-yellow-600"
      : status.online
        ? "text-green-600"
        : "text-red-600";

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Button onClick={testBackendConnection}>
        Testar Conexão com o Backend
      </Button>

      <p className="text-lg font-medium absolute bottom-5">
        Server status: <span className={statusColor}>{status.message}</span>
      </p>
    </div>
  );
}
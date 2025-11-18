import { Toaster } from "@/components/ui/sonner";

export default function Main({ children }) {
    return (
        <>
            <div className="flex justify-center items-center h-screen bg-zinc-300">{children}</div>
            <Toaster position="top-center" />
        </>
    );
}
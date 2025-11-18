import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Main from "@/components/Main";

export default function Home() {
    const navigate = useNavigate();

    return (
        <Main>
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-2xl">Páginas</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Button onClick={() => navigate("/register")} className="w-full">
                        Cadastro
                    </Button>
                    <Button onClick={() => navigate("/login")} className="w-full">
                        Login
                    </Button>
                </CardContent>
            </Card>
        </Main>
    );
}
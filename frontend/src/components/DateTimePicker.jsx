"use client";

import * as React from "react";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

export function DateTimePicker({ control, name, label, type = "start" }) {
    const [time, setTime] = React.useState("");

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium">{label}</label>
            <Controller
                control={control}
                name={name}
                render={({ field }) => {
                    const displayValue = field.value
                        ? `${field.value.getDate().toString().padStart(2, "0")}/${(field.value.getMonth() + 1).toString().padStart(2, "0")}/${field.value.getFullYear()}`
                        : `Selecionar ${type === "start" ? "início" : "fim"}`;

                    return (
                        <div className="flex flex-col sm:flex-row gap-2 items-center">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="flex-1 justify-start text-left min-w-[150px]"
                                    >
                                        {displayValue}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(date) => {
                                            if (!date) return;
                                            const newDate = new Date(date);
                                            if (time) {
                                                const [hours, minutes] = time.split(":");
                                                newDate.setHours(parseInt(hours, 10));
                                                newDate.setMinutes(parseInt(minutes, 10));
                                            }
                                            field.onChange(newDate);
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            <Input
                                type="time"
                                value={time}
                                className="w-32"
                                onChange={(e) => {
                                    setTime(e.target.value);
                                    if (field.value) {
                                        const newDate = new Date(field.value);
                                        const [hours, minutes] = e.target.value.split(":");
                                        newDate.setHours(parseInt(hours, 10));
                                        newDate.setMinutes(parseInt(minutes, 10));
                                        field.onChange(newDate);
                                    }
                                }}
                            />
                        </div>
                    );
                }}
            />
        </div>
    );
}
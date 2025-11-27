import * as yup from "yup";

export const eventSchema = yup.object({
    title: yup
        .string()
        .required("O título é obrigatório")
        .min(1, "Mínimo 1 caractere"),
    description: yup
        .string()
        .required("A descrição é obrigatória")
        .min(1, "Mínimo 1 caractere"),
    date: yup
        .date()
        .required("A data é obrigatória"),
    start_time: yup
        .string()
        .required("O horário de início é obrigatório"),
    end_time: yup
        .string()
        .required("O horário de fim é obrigatório"),
    location: yup
        .string()
        .required("O local é obrigatório")
        .min(1, "Mínimo 1 caractere"),
    capacity: yup
        .number()
        .required("A capacidade é obrigatória")
        .min(1, "Capacidade mínima é 1 pessoa")
        .max(1000, "Capacidade máxima excedida"), // você pode ajustar esse limite
});
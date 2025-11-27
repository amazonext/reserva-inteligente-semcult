import * as yup from "yup";

export const requestEventSchema = yup.object({
    requester_name: yup
        .string()
        .required("Por favor, informe seu nome completo"),

    requester_cpf: yup
        .string()
        .required("O CPF é obrigatório")
        .min(14, "O CPF deve estar completo")
        .max(14, "O CPF deve estar completo"),

    title: yup
        .string()
        .required("O título do evento é obrigatório")
        .max(100, "O título não pode ultrapassar 100 caracteres"),

    description: yup
        .string()
        .required("A descrição do evento é obrigatória")
        .max(1000, "A descrição não pode ultrapassar 1000 caracteres"),

    start_time: yup
        .date()
        .typeError("Informe uma data/hora válida")
        .required("Informe a data e hora de início"),

    end_time: yup
        .date()
        .typeError("Informe uma data/hora válida")
        .required("Informe a data e hora de término")
        .min(yup.ref("start_time"), "A data de término deve ser após a data de início"),

    location_name: yup
        .string()
        .required("Selecione o espaço desejado"),

    capacity: yup
        .number()
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .typeError("Informe apenas números válidos")
        .required("O público estimado é obrigatório")
        .positive("O público deve ser maior que zero")
        .integer("Informe um número inteiro"),
});
import { Type } from '@sinclair/typebox';

export enum PrizeType {
    LUCKY_TICKET = 'lucky_ticket',
    OTHER = 'other'
}

export const generateBodySchema = Type.Object({
    type: Type.Enum(PrizeType),
    title: Type.String(),
    description: Type.Optional(Type.String()),
    value: Type.Number({ minimum: 0 }),
    image: Type.Optional(Type.String({ format: 'uri' })),
    amount: Type.Number({ minimum: 1 }),
    seed: Type.Optional(Type.Number()),
    ticket_digits_number: Type.Optional(Type.Number({ minimum: 1 })),
});

export const generateResponseSchema = Type.Object({
    data: Type.Array(Type.Object({
        ticket_number: Type.String(),
        value: Type.Number(),
        type: Type.Enum(PrizeType),
        description: Type.Optional(Type.String()),
        image: Type.Optional(Type.String({ format: 'uri' })),
    })),
    title: Type.String(),
    generatedAt: Type.String(),
    totalAmount: Type.Number(),
    seed: Type.Number(),
});

export const generateWithCustomSeedBodySchema = Type.Object({
    amount: Type.Number(),
    prize: Type.Number(),
    title: Type.String(),
    seed: Type.Number(),
    date: Type.String(),
    ticket_digits_number: Type.Optional(Type.Number({ minimum: 1 })),
});

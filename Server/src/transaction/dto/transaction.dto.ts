import { IsNotEmpty } from 'class-validator';

export class TransactionDto {
    id: number;
    amount: number;
    date: Date;
    description: string;
    type: string;
    category: string;
    @IsNotEmpty()
    account: string;
}
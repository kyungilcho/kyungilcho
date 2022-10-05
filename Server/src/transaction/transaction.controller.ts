import { Body, Controller, Get } from '@nestjs/common';
import { TransactionDto } from './dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get('create')
    test(@Body() dto: TransactionDto ) {
        console.log(dto);
        
        return this.transactionService.test();
    }
}

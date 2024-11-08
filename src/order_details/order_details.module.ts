import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { OrderDetailsController } from './order_details.controller';
import { OrderDetailsService } from './order_details.service';
@Module({
    imports: [TypeOrmModule.forFeature([OrderDetail])],
    controllers: [OrderDetailsController],
    providers: [OrderDetailsService],
})
export class OrderDetailsModule {}

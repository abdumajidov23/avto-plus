import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './clients/clients.module';
import { CarModule } from './car/car.module';
import { MechanicsModule } from './mechanics/mechanics.module';
import { MechanicSkillsModule } from './mechanic_skills/mechanic_skills.module';
import { SkillsModule } from './skills/skills.module';
import { ServicesModule } from './services/services.module';
import { InventoryModule } from './inventory/inventory.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PartsModule } from './parts/parts.module';
import { OrderDetailsModule } from './order_details/order_details.module';
import { PaymentsModule } from './payments/payments.module';
import { OrderModule } from './orders/orders.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      autoLoadEntities: true,
      logging: false,
    }),
    AdminModule,
    AuthModule,
    ClientModule,
    CarModule,
    MechanicsModule,
    MechanicSkillsModule,
    SkillsModule,
    ServicesModule,
    InventoryModule,
    AppointmentsModule,
    PartsModule,
    OrderDetailsModule,
    PaymentsModule,
    OrderModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

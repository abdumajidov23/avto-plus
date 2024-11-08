import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "../admin/admin.module";
import { MailModule } from "../mail/mail.module";
import { ClientModule } from "../clients/clients.module";
import { MechanicsModule } from "../mechanics/mechanics.module";

@Module({
  imports: [
    AdminModule,
    ClientModule,
    MechanicsModule,
    JwtModule.register({
      global: true,
    }),
    MailModule,
    // CustomersModule,
    // DeliveryModule,
  ],
  exports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}



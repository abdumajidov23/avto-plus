import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/entities/admin.entity';
import { Client } from '../clients/entities/client.entity';
import { Mechanic } from '../mechanics/entities/mechanic.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  // Client uchun email yuborish
  async sendMailToClient(client: Client) {
    const url = `${process.env.API_URL}:${process.env.PORT}/clients/activate/${client.activation_link}`;
    await this.mailerService.sendMail({
      to: client.email, // Clientning emaili
      subject: 'Activate your account',
      template: './confirm',
      context: {
        name: client.name,
        url,
      },
    });
  }

  // Mechanic uchun email yuborish
  async sendMailToMechanic(mechanic: Mechanic) {
    const url = `${process.env.API_URL}:${process.env.PORT}/mechanic/activate/${mechanic.activation_link}`;
    await this.mailerService.sendMail({
      to: mechanic.login, // Mechanicning emaili
      subject: 'Activate your account',
      template: './confirm',
      context: {
        name: mechanic.name,
        url,
      },
    });
  }
}

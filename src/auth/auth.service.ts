import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { Admin } from '../admin/entities/admin.entity';
import { Response } from 'express';
import { SignInDto } from './dto/signindto';
import { MailService } from '../mail/mail.service';
import { CreateClientDto } from '../clients/dto/create-client.dto';
import { Client } from '../clients/entities/client.entity';
import { ClientService } from '../clients/clients.service';
import { MechanicService } from '../mechanics/mechanics.service';
import { Mechanic } from '../mechanics/entities/mechanic.entity';
import { CreateMechanicDto } from '../mechanics/dto/create-mechanic.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly clientService: ClientService,
    private readonly mechanicService: MechanicService,
    private readonly mailService: MailService,
  ) {}

  async setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_TIME_MS),
    });
  }

  async generateTokensWithAdmin(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      is_admin: true,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { access_token, refresh_token };
  }

  async AddAdmin(createAdminDto: CreateAdminDto, res: Response) {
    const existingAdmin = await this.adminService.findAdminByEmail(
      createAdminDto.email,
    );

    if (existingAdmin) {
      throw new BadRequestException('Bunday admin mavjud!');
    }

    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 10);
    const newAdmin = await this.adminService.create({
      ...createAdminDto,
      hashed_password,
    });

    const tokens = await this.generateTokensWithAdmin(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);
    const activation_link = uuid.v4();
    const updatedAdmin = await this.adminService.update(newAdmin.id, {
      hashed_refresh_token,
      activation_link,
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return {
      message: "Admin muvaffaqiyatli qo'shildi!",
      admin: updatedAdmin,
      access_token: tokens.access_token,
    };
  }

  async signInAdmin(signInAdminDto: SignInDto, res: Response) {
    const admin = await this.adminService.findAdminByEmail(
      signInAdminDto.email,
    );

    if (!admin) {
      throw new BadRequestException("Login yoki parol noto'g'ri");
    }

    const isPasswordValid = await bcrypt.compare(
      signInAdminDto.password,
      admin.hashed_password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException("Login yoki parol noto'g'ri");
    }

    if (!admin.is_active) {
      throw new BadRequestException('Akkaunt hali faollashtirilmagan');
    }

    const tokens = await this.generateTokensWithAdmin(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 4);

    await this.adminService.update(admin.id, { hashed_refresh_token });

    await this.setRefreshTokenCookie(res, tokens.refresh_token);

    return {
      message: 'Tizimga muvaffaqiyatli kirildi',
      admin,
      tokens,
    };
  }

  async signOutAdmin(refreshToken: string, res: Response) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const admin = await this.adminService.findOne(payload.id);
    if (!admin) {
      throw new BadRequestException('admin not found');
    }

    await this.adminService.update(admin.id, { hashed_refresh_token: null });

    res.clearCookie('refresh_token');

    return {
      message: 'admin successfully logouted',
    };
  }

  async refreshTokensAdmin(refresh_token: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const admin = await this.adminService.findOne(payload.id);
      if (!admin) {
        throw new UnauthorizedException('Admin not found');
      }

      const valid_refresh_token = await bcrypt.compare(
        refresh_token,
        admin.hashed_refresh_token,
      );
      if (!valid_refresh_token) {
        throw new UnauthorizedException('Unauthorized admin');
      }

      const tokens = await this.generateTokensWithAdmin(admin);
      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 3);

      await this.adminService.update(admin.id, { hashed_refresh_token });

      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        maxAge: +process.env.REFRESH_TIME_MS,
      });

      return {
        access_token: tokens.access_token,
      };
    } catch (error) {
      throw new BadRequestException('Expired token');
    }
  }

  async generateTokensWithClient(client: Client) {
    const payload = {
      id: client.id,
      email: client.email,
      is_active: client.is_active,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { access_token, refresh_token };
  }

  async signUpClient(createClientDto: CreateClientDto, res: Response) {
    const existingClient = await this.clientService.findClientByEmail(
      createClientDto.email,
    );

    if (existingClient) {
      throw new BadRequestException('Bunday admin mavjud!');
    }

    if (createClientDto.password !== createClientDto.confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }

    const hashed_password = await bcrypt.hash(createClientDto.password, 10);
    const newClient = await this.clientService.create({
      ...createClientDto,
      hashed_password,
    });

    const tokens = await this.generateTokensWithClient(newClient);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);
    const activation_link = uuid.v4();
    const updatedClient = await this.clientService.update(newClient.id, {
      hashed_refresh_token,
      activation_link,
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    try {
      await this.mailService.sendMailToClient(updatedClient);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error sending mail');
    }

    return {
      message: "Client muvaffaqiyatli qo'shildi!",
      client: updatedClient,
      tokens,
    };
  }

  async signInClient(signInClientDto: SignInDto, res: Response) {
    const client = await this.clientService.findClientByEmail(
      signInClientDto.email,
    );

    if (!client) {
      throw new BadRequestException("Login yoki parol noto'g'ri");
    }

    const isPasswordValid = await bcrypt.compare(
      signInClientDto.password,
      client.hashed_password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException("Login yoki parol noto'g'ri");
    }

    if (!client.is_active) {
      throw new BadRequestException('Akkaunt hali faollashtirilmagan');
    }

    const tokens = await this.generateTokensWithClient(client);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 4);

    await this.clientService.update(client.id, { hashed_refresh_token });

    await this.setRefreshTokenCookie(res, tokens.refresh_token);

    return {
      message: 'Tizimga muvaffaqiyatli kirildi',
      client,
      tokens,
    };
  }

  async signOutClient(refreshToken: string, res: Response) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const client = await this.clientService.findOne(payload.id);
    if (!client) {
      throw new BadRequestException('admin not found');
    }

    await this.clientService.update(client.id, {
      hashed_refresh_token: null,
    });

    res.clearCookie('refresh_token');

    return {
      message: 'admin successfully logouted',
    };
  }

  async refreshTokensClient(refresh_token: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const client = await this.clientService.findOne(payload.id);
      if (!client) {
        throw new UnauthorizedException('Client not found');
      }

      const valid_refresh_token = await bcrypt.compare(
        refresh_token,
        client.hashed_refresh_token,
      );
      if (!valid_refresh_token) {
        throw new UnauthorizedException('Unauthorized admin');
      }

      const tokens = await this.generateTokensWithClient(client);
      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 3);

      await this.clientService.update(client.id, { hashed_refresh_token });

      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        maxAge: +process.env.REFRESH_TIME_MS,
      });

      return {
        access_token: tokens.access_token,
      };
    } catch (error) {
      throw new BadRequestException('Expired token');
    }
  }

  async generateTokensWithMechanic(mechanic: Mechanic) {
    const payload = {
      id: mechanic.id,
      email: mechanic.login,
      is_active: mechanic.is_active,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { access_token, refresh_token };
  }

  async signUpMechanic(createMechanicDto: CreateMechanicDto, res: Response) {
    const existingMechanic = await this.mechanicService.findMechanicByEmail(
      createMechanicDto.login,
    );

    if (existingMechanic) {
      throw new BadRequestException('Bunday admin mavjud!');
    }

    if (createMechanicDto.password !== createMechanicDto.confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }

    const hashed_password = await bcrypt.hash(createMechanicDto.password, 10);
    const newMechanic = await this.mechanicService.create({
      ...createMechanicDto,
      hashed_password,
    });

    const tokens = await this.generateTokensWithMechanic(newMechanic);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);
    const activation_link = uuid.v4();
    const updatedMechanic = await this.mechanicService.update(newMechanic.id, {
      hashed_refresh_token,
      activation_link,
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    try {
      await this.mailService.sendMailToMechanic(updatedMechanic);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error sending mail');
    }

    return {
      message: "Mechanic muvaffaqiyatli qo'shildi!",
      mechanic: updatedMechanic,
      tokens,
    };
  }

  async signInMechanic(signInClientDto: SignInDto, res: Response) {
    const mechanic = await this.mechanicService.findMechanicByEmail(
      signInClientDto.email,
    );

    if (!mechanic) {
      throw new BadRequestException("Login yoki parol noto'g'ri");
    }

    const isPasswordValid = await bcrypt.compare(
      signInClientDto.password,
      mechanic.hashed_password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException("Login yoki parol noto'g'ri");
    }

    if (!mechanic.is_active) {
      throw new BadRequestException('Akkaunt hali faollashtirilmagan');
    }

    const tokens = await this.generateTokensWithMechanic(mechanic);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 4);

    await this.mechanicService.update(mechanic.id, { hashed_refresh_token });

    await this.setRefreshTokenCookie(res, tokens.refresh_token);

    return {
      message: 'Tizimga muvaffaqiyatli kirildi',
      mechanic,
      tokens,
    };
  }

  async signOutMechanic(refreshToken: string, res: Response) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const mechanic = await this.mechanicService.findOne(payload.id);
    if (!mechanic) {
      throw new BadRequestException('Mechanic not found');
    }

    await this.mechanicService.update(mechanic.id, {
      hashed_refresh_token: null,
    });

    res.clearCookie('refresh_token');

    return {
      message: 'Mechanic successfully logouted',
    };
  }

  async refreshTokensMechanic(refresh_token: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const mechanic = await this.mechanicService.findOne(payload.id);
      if (!mechanic) {
        throw new UnauthorizedException('Mechanic not found');
      }

      const valid_refresh_token = await bcrypt.compare(
        refresh_token,
        mechanic.hashed_refresh_token,
      );
      if (!valid_refresh_token) {
        throw new UnauthorizedException('Unauthorized mechanic');
      }

      const tokens = await this.generateTokensWithMechanic(mechanic);
      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 3);

      await this.mechanicService.update(mechanic.id, { hashed_refresh_token });

      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        maxAge: +process.env.REFRESH_TIME_MS,
      });

      return {
        access_token: tokens.access_token,
      };
    } catch (error) {
      throw new BadRequestException('Expired token');
    }
  }
}

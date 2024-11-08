import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { SignInDto } from "./dto/signindto";
import { CreatorGuard } from "../guards/creator.guard";
import { CookieGetter } from "../decorators/cookie_getter.decorator";
import { Response } from "express";
import { CreateClientDto } from "../clients/dto/create-client.dto";
import { CreateMechanicDto } from "../mechanics/dto/create-mechanic.dto";
import { ClientService } from "../clients/clients.service";

@ApiTags("Authorization (Ro'yhatdan o'tish)")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly clientService: ClientService,
  ) {}

  @ApiOperation({ summary: "Yangi Admin qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Admin muvaffaqiyatli qo'shildi",
    schema: {
      example: {
        message: "Admin muvaffaqiyatli ro'yxatdan o'tdi!",
        admin: {
          id: 1,
          email: "admin",
          is_active: true,
          is_creator: true,
        },
        access_token: "access_token",
      },
    },
  })
  // @UseGuards(CreatorGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post("add-admin")
  async add(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.AddAdmin(createAdminDto, res);
  }

  @ApiOperation({ summary: "Adminni tizimga kiritish (signIn)" })
  @ApiResponse({
    status: 200,
    description: "Tizimga kirish muvaffaqiyatli",
    schema: {
      example: {
        message: "Tizimga muvaffaqiyatli kirildi",
        admin: {
          id: 1,
          email: "admin@gmail.com",
          is_active: true,
        },
        access_token: "access_token",
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInAdmin(signInDto, res);
  }

  @ApiOperation({ summary: "Adminni tizimdan chiqarish (signOut)" })
  @ApiResponse({
    status: 200,
    description: "Admin tizimdan muvaffaqiyatli chiqarildi",
    schema: {
      example: {
        message: "Tizimdan muvaffaqiyatli chiqildi",
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post("sign-out")
  async signOut(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutAdmin(refreshToken, res);
  }

  @ApiOperation({ summary: "Yangi access token olish (refreshToken)" })
  @ApiResponse({
    status: 200,
    description: "Yangi access token berildi",
    schema: {
      example: {
        access_token: "yangi_access_token",
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post("refreshtoken")
  async refreshTokenAdmin(
    @Res({ passthrough: true }) res: Response,
    @CookieGetter("refresh_token") refresh_token: string
  ) {
    return this.authService.refreshTokensAdmin(refresh_token, res);
  }

  @ApiOperation({ summary: "Yangi Client qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Client muvaffaqiyatli qo'shildi",
    schema: {
      example: {
        message: "Client muvaffaqiyatli ro'yxatdan o'tdi!",
        admin: {
          id: 1,
          email: "client",
          is_active: true,
          is_creator: true,
        },
        access_token: "access_token",
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post("sign-up-client")
  async signUpClient(
    @Body() createClientDto: CreateClientDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signUpClient(createClientDto, res);
  }

  @ApiOperation({ summary: "Clientni tizimga kiritish (signIn)" })
  @ApiResponse({
    status: 200,
    description: "Tizimga kirish muvaffaqiyatli",
    schema: {
      example: {
        message: "Tizimga muvaffaqiyatli kirildi",
        admin: {
          id: 1,
          email: "client@gmail.com",
          is_active: true,
        },
        access_token: "access_token",
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post("sign-in-client")
  async signInClient(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInClient(signInDto, res);
  }

  @ApiOperation({ summary: "Clienti tizimdan chiqarish (signOut)" })
  @ApiResponse({
    status: 200,
    description: "Client tizimdan muvaffaqiyatli chiqarildi",
    schema: {
      example: {
        message: "Tizimdan muvaffaqiyatli chiqildi",
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post("sign-out-client")
  async signOutClient(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutClient(refreshToken, res);
  }

  @ApiOperation({ summary: "Yangi access token olish (refreshToken)" })
  @ApiResponse({
    status: 200,
    description: "Yangi access token berildi",
    schema: {
      example: {
        access_token: "yangi_access_token",
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post("refreshtoken")
  async refreshTokenClient(
    @Res({ passthrough: true }) res: Response,
    @CookieGetter("refresh_token") refresh_token: string
  ) {
    return this.authService.refreshTokensClient(refresh_token, res);
  }

  @ApiOperation({ summary: "Yangi Mechanic qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Mechanic muvaffaqiyatli qo'shildi",
    schema: {
      example: {
        message: "Mechanic muvaffaqiyatli ro'yxatdan o'tdi!",
        admin: {
          id: 1,
          email: "mechanic@gmail.com",
          is_active: true,
          is_creator: true,
        },
        access_token: "access_token",
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post("sign-up-mechanic")
  async signUpMechanic(
    @Body() createMechanicDto: CreateMechanicDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signUpMechanic(createMechanicDto, res);
  }

  @ApiOperation({ summary: "Mechanicni tizimga kiritish (signIn)" })
  @ApiResponse({
    status: 200,
    description: "Tizimga kirish muvaffaqiyatli",
    schema: {
      example: {
        message: "Tizimga muvaffaqiyatli kirildi",
        admin: {
          id: 1,
          email: "mechanic@gmail.com",
          is_active: true,
        },
        access_token: "access_token",
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post("sign-in-mechanic")
  async signInMechanic(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInMechanic(signInDto, res);
  }

  @ApiOperation({ summary: "Mechanicni tizimdan chiqarish (signOut)" })
  @ApiResponse({
    status: 200,
    description: "Mechanic tizimdan muvaffaqiyatli chiqarildi",
    schema: {
      example: {
        message: "Tizimdan muvaffaqiyatli chiqildi",
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post("sign-out-mechanic")
  async signOutMechanic(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutMechanic(refreshToken, res);
  }

  @ApiOperation({ summary: "Yangi access token olish (refreshToken)" })
  @ApiResponse({
    status: 200,
    description: "Yangi access token berildi",
    schema: {
      example: {
        access_token: "yangi_access_token",
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post("refreshtoken")
  async refreshTokenMechanic(
    @Res({ passthrough: true }) res: Response,
    @CookieGetter("refresh_token") refresh_token: string
  ) {
    return this.authService.refreshTokensMechanic(refresh_token, res);
  }
}

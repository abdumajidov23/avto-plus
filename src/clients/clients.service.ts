import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) // Client entityni ulayapmiz
    private clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const { password, confirm_password, ...clientData } = createClientDto;
  
    // Validate password confirmation
    if (password !== confirm_password) {
      throw new Error('Passwords do not match');
    }
  
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // Use bcrypt.hash() instead of crypto.has()
  
    // Generate activation link (e.g., a random string or UUID)
    const activationLink = 'generated_activation_link'; // Replace with actual logic for generating activation link
  
    // Generate refresh token (optional example)
    const hashedRefreshToken = 'generated_refresh_token'; // Replace with actual logic for generating refresh token
  
    // Create the client with a default value for `is_active`
    const client = this.clientRepository.create({
      ...clientData,
      hashed_password: hashedPassword,
      hashed_refresh_token: hashedRefreshToken,
      activation_link: activationLink,
      is_active: false, // Ensure this is set here
    });
  
    return this.clientRepository.save(client);
  }
  
  

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findClientByEmail(email: string): Promise<Client> {
    const admin = await this.clientRepository.findOneBy({ email });
    return admin;
  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOneBy({ id });
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) {
      throw new NotFoundException(`Example with ID ${id} not found`);
    }
    Object.assign(client, updateClientDto);
    return await this.clientRepository.save(client);
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }

  async activateClient(activationLink: string): Promise<Client | null> {
    const client = await this.clientRepository.findOne({
      where: { activation_link: activationLink },
    });
    if (!client) {
      return null;
    }
    client.is_active = true;
    await this.clientRepository.save(client);
    return client;
  }


}

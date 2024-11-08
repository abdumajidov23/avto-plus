import { Controller, Post, Get, Param, Body, Patch, Delete, Put } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
    constructor(private readonly skillsService: SkillsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new skill' })
    @ApiResponse({ status: 201, description: 'The skill has been successfully created.' })
    async create(@Body() createSkillDto: CreateSkillDto): Promise<Skill> {
        return this.skillsService.create(createSkillDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all skills' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved all skills.' })
    async findAll(): Promise<Skill[]> {
        return this.skillsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a skill by ID' })
    @ApiParam({ name: 'id', type: Number, description: 'Skill ID' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved the skill by ID.' })
    @ApiResponse({ status: 404, description: 'Skill not found' })
    findOne(@Param('id') id: string) {
        return this.skillsService.findOne(Number(id)); // `id` ni `number` ga aylantirish
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a skill by ID' })
    @ApiParam({ name: 'id', type: Number, description: 'Skill ID' })
    @ApiResponse({ status: 200, description: 'Successfully updated the skill.' })
    @ApiResponse({ status: 404, description: 'Skill not found' })
    update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
        return this.skillsService.update(Number(id), updateSkillDto); // `id` ni `number` ga aylantirish
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a skill by ID' })
    @ApiParam({ name: 'id', type: Number, description: 'Skill ID' })
    @ApiResponse({ status: 200, description: 'Successfully deleted the skill.' })
    @ApiResponse({ status: 404, description: 'Skill not found' })
    remove(@Param('id') id: string) {
        return this.skillsService.remove(Number(id)); // `id` ni `number` ga aylantirish
    }
}

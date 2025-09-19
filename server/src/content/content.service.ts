import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  create(createContentDto: CreateContentDto) {
    return this.prisma.content.create({ data: createContentDto });
  }

  findAll() {
    // Also fetch unpublished content for the admin view
    return this.prisma.content.findMany({ orderBy: { createdAt: 'desc' } });
  }

  update(id: string, updateContentDto: UpdateContentDto) {
    return this.prisma.content.update({
      where: { id },
      data: updateContentDto,
    });
  }

  remove(id: string) {
    return this.prisma.content.delete({ where: { id } });
  }
}

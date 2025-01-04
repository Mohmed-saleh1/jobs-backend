import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactDto, UpdateContactDto } from './Dtos/contact.dtos';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = this.contactRepository.create(createContactDto);
    return this.contactRepository.save(contact);
  }

  async findAllNew(): Promise<Contact[]> {
    return this.contactRepository.find({
      select: ['fname', 'lname', 'email', 'createdAt'],
      where: { seen: false },
    });
  }

  async findAllOld(): Promise<Contact[]> {
    return this.contactRepository.find({
      select: ['fname', 'lname', 'email', 'createdAt'],
      where: { seen: true },
    });
  }

  async findOne(id: number): Promise<Contact> {
    return this.contactRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    await this.contactRepository.update(id, updateContactDto);
    return this.contactRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.contactRepository.delete(id);
  }
}

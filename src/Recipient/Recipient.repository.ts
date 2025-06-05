import IRepository from '../Core/interfaces/IRepository';
import RecipientEntity from './Recipient.entity';
import { PrismaClient } from '@prisma/client';
import RecipientMapper from '../Core/shared/dataMappers/Recipient.mapper';

class RecipientRepository implements IRepository<RecipientEntity> {
    private prismaClient = new PrismaClient();

    public async getAll(): Promise<RecipientEntity[]> {
        try {
            const recipients = await this.prismaClient.recipient.findMany();
            return recipients ? recipients.map(RecipientMapper.fromPrismaMapper) : [];
        } catch (error) {
            console.error('Error fetching recipients:', error);
            throw new Error('Could not fetch recipients');
        }
    }

    public async getById(uuid: string): Promise<RecipientEntity | null> {
        try {
            const recipient = await this.prismaClient.recipient.findUnique({
                where: { uuid }
            });
            return recipient ? RecipientMapper.fromPrismaMapper(recipient) : null;
        } catch (error) {
            console.error('Error fetching recipient by ID:', error);
            throw new Error('Could not fetch recipient');
        }
    }

}

export default RecipientRepository;
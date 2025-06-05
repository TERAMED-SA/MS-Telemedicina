import { Recipient } from "@prisma/client";
import RecipientEntity from "../../../Recipient/Recipient.entity";
import { OutRecipientDto } from "src/Core/shared/dtos/Recipient.dto";

class RecipientMapper {
    public static fromPrismaMapper(data: Recipient): RecipientEntity {
        const entity = new RecipientEntity(
            data.id,
            data.externalUserId,
            data.uuid,
            data.name,
            data.cpf,
            data.birthday,
            data.phone,
            data.email,
            data.zipCode,
            data.address,
            data.city,
            data.state,
            data.isActive,
            data.paymentType as RecipientEntity['paymentType'],
            data.serviceType as RecipientEntity['serviceType'],
            data.holder ?? undefined,
        );
        return entity;
    }

    public static toPrismaMapper(entity: RecipientEntity): Partial<Recipient> {
        return {
            id: entity.getId(),
            externalUserId: entity.getExternalUserId(),
            uuid: entity.getUuid(),
            name: entity.getName(),
            cpf: entity.getCpf(),
            birthday: entity.getBirthday(),
            zipCode: entity.getZipCode(),
            address: entity.getAddress(),
            phone: entity.getPhone(),
            email: entity.getEmail(),
            city: entity.getCity(),
            state: entity.getState(),
            isActive: entity.getIsActive(),
            paymentType: entity.getPaymentType() as unknown as Recipient['paymentType'] ?? undefined,
            serviceType: entity.getServiceType() as unknown as Recipient['serviceType'] ?? undefined,
            holder: entity.getHolder(),
            createdAt: entity.getCreatedAt(),
            updatedAt: entity.getUpdatedAt(),
            deletedAt: entity.getDeletedAt(),
        };
    }
    public static toOutDtoRecipientMapper(entity: RecipientEntity): OutRecipientDto {
        return {
            id: entity.getId(),
            externalUserId: entity.getExternalUserId(),
            uuid: entity.getUuid(),
            name: entity.getName(),
            cpf: entity.getCpf(),
            birthday: entity.getBirthday(),
            zipCode: entity.getZipCode(),
            address: entity.getAddress(),
            city: entity.getCity(),
            state: entity.getState(),
            holder: entity.getHolder(),
            email: entity.getEmail(),
            phone: entity.getPhone(),
            paymentType: entity.getPaymentType(),
            serviceType: entity.getServiceType(),
            isActive: entity.getIsActive(),
            createdAt: entity.getCreatedAt(),
            updatedAt: entity.getUpdatedAt(),
            deletedAt: entity.getDeletedAt(),
        };
    }
}
export default RecipientMapper;
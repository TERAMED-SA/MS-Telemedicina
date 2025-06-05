import { PaymentType, ServiceType } from "src/Core/shared/dtos/Recipient.dto";

class RecipientEntity {
    private readonly id: number;
    private readonly externalUserId: number;
    private readonly uuid: string;
    private name: string;
    private readonly cpf: string;
    private readonly birthday: string;
    private phone: string;
    private email: string;
    private zipCode: string;
    private address: string;
    private city: string;
    private state: string;
    private paymentType: PaymentType;
    private serviceType: ServiceType;
    private holder?: string;
    private readonly createdAt: Date;
    private updatedAt: Date;
    private deletedAt?: Date | null;
    private isActive: boolean;


    constructor(
        id: number,
        externalUserId: number,
        uuid: string,
        name: string,
        cpf: string,
        birthday: string,
        phone: string,
        email: string,
        zipCode: string,
        address: string,
        city: string,
        state: string,
        isActive: boolean = true,
        paymentType: PaymentType = PaymentType.RECORRENTE,
        serviceType: ServiceType = ServiceType.CLINICO,
        holder?: string
    ) {
        this.id = id;
        this.externalUserId = externalUserId;
        this.uuid = uuid;
        this.name = name;
        this.cpf = cpf;
        this.birthday = birthday;
        this.phone = phone;
        this.email = email;
        this.zipCode = zipCode;
        this.address = address;
        this.city = city;
        this.state = state;
        this.paymentType = paymentType;
        this.serviceType = serviceType;
        this.holder = holder;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.isActive = isActive;
        
    }
    
    getId(): number {
        return this.id;
    }
    getExternalUserId(): number {
        return this.externalUserId;
    }
    getName(): string {
        return this.name;
    }
    getBirthday(): string {
        return this.birthday;
    }
    getPhone(): string {
        return this.phone;
    }
    getUuid(): string {
        return this.uuid;
    }

    getCpf(): string {
        return this.cpf;
    }

    getEmail(): string {
        return this.email;
    }

    getZipCode(): string {
        return this.zipCode;
    }

    getAddress(): string {
        return this.address;
    }

    getCity(): string {
        return this.city;
    }

    getState(): string {
        return this.state;
    }

    getPaymentType(): PaymentType {
        return this.paymentType;
    }

    getServiceType(): ServiceType {
        return this.serviceType;
    }

    getHolder(): string | undefined {
        return this.holder;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    getDeletedAt(): Date | null | undefined {
        return this.deletedAt;
    }

    getIsActive(): boolean {
        return this.isActive;
    }

    setName(name: string): void {
        if (!name) throw new Error("Name cannot be empty");
        this.name = name;
        this.updatedAt = new Date();
    }
    setPhone(phone: string): void {
        if (!phone) throw new Error("Phone cannot be empty");
        this.phone = phone;
        this.updatedAt = new Date();
    }
    setEmail(email: string): void {
        if (!email) throw new Error("Email cannot be empty");
        this.email = email;
        this.updatedAt = new Date();
    }
    setZipCode(zipCode: string): void {
        if (!zipCode) throw new Error("Zip code cannot be empty");
        this.zipCode = zipCode;
        this.updatedAt = new Date();
    }
    setAddress(address: string): void {
        if (!address) throw new Error("Address cannot be empty");
        this.address = address;
        this.updatedAt = new Date();
    }
    setCity(city: string): void {
        if (!city) throw new Error("City cannot be empty");
        this.city = city;
        this.updatedAt = new Date();
    }
    setState(state: string): void {
        if (!state) throw new Error("State cannot be empty");
        this.state = state;
        this.updatedAt = new Date();
    }
    setPaymentType(paymentType: PaymentType): void {
        if (!Object.values(PaymentType).includes(paymentType)) {
            throw new Error("Invalid payment type");
        }
        this.paymentType = paymentType;
        this.updatedAt = new Date();
    }
    setServiceType(serviceType: ServiceType): void {
        if (!Object.values(ServiceType).includes(serviceType)) {
            throw new Error("Invalid service type");
        }
        this.serviceType = serviceType;
        this.updatedAt = new Date();
    }
    setHolder(holder: string | undefined): void {
        if (holder && holder.trim() === "") {
            throw new Error("Holder cannot be empty");
        }
        this.holder = holder;
        this.updatedAt = new Date();
    }
    setIsActive(isActive: boolean): void {
        if (typeof isActive !== "boolean") {
            throw new Error("isActive must be a boolean");
        }
        this.isActive = isActive;
        this.updatedAt = new Date();
    }
    setDeletedAt(deletedAt: Date | null): void {
        if (deletedAt && !(deletedAt instanceof Date)) {
            throw new Error("deletedAt must be a Date or null");
        }
        this.deletedAt = deletedAt;
        this.updatedAt = new Date();
    }
}

export default RecipientEntity;
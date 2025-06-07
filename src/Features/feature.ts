import { Injectable } from "@nestjs/common";
import { BecomeBeneficiaryRequestDto } from "src/Infrastructure/Providers/Rapidoc/dtos/beneficiaries";
import { BeneficiaryService } from "src/Modules/Beneficiary/beneficiary.service";
import { SubscriptionService } from "src/Modules/Subscriptions/subscriptions.service";
import { UserService } from "src/Modules/User/user.service";

@Injectable()
export class Features {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly beneficiaryService: BeneficiaryService,
    private readonly userService: UserService
  ) { }

  async createBeneficiary({ userId, subscriptionId }: { userId: number, subscriptionId: string }) {
    const userExists = await this.userService.getUserDetails(userId.toString())

    if (!userExists) {
      throw new Error("User does not exists.");
    }

    if (!userExists.email) {
      throw new Error("User does not have email.");
    }

    const subscriptionExists = await this.subscriptionService.readById(subscriptionId)

    if (!subscriptionExists) {
      throw new Error("Subscription does not exists.");
    }

    const beneficiary: BecomeBeneficiaryRequestDto = {
      name: userExists.name,
      cpf: userExists.cpf,
      birthday: "",
      phone: userExists.phoneNumber,
      email: userExists.email ,
      zipCode: "",
      address: "",
      city: "",
      state: "",
    }

    await this.beneficiaryService.createBeneficiary(beneficiary)
  }

  async enterAnAppointmentNow(userId: string) {

    const requiredFeature = "telemedicine";

    const isAllowed = await this.subscriptionService.verifyFeatureAccess(userId, requiredFeature);

    if (!isAllowed) {
      throw new Error("User does not have access to the telemedicine feature.");
    }

    const roomAccess = await this.beneficiaryService.requestRoomAccess(userId);

    if (!roomAccess.success) {
      throw new Error("Failed to access the telemedicine room.");
    }

    const roomURL = roomAccess.url;

    return roomURL;
  }

  async scheduleAppointment() {
    return "/features/scheduleAppointment";
  }
}
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { SubscriptionFeature } from "src/Infrastructure/Providers/Subscriptions/dtos";
import { SubscriptionServiceProvider } from "src/Infrastructure/Providers/Subscriptions/subscriptions.service";

@Injectable()
export class SubscriptionService {
 
  constructor(private readonly provider: SubscriptionServiceProvider) {}

  async verifyFeatureAccess(userId: string, feature: SubscriptionFeature): Promise<boolean> {
   const observable = await this.provider.verifyFeatureAccess(userId, feature);

   const access = await firstValueFrom(observable);

   return access.allowed;
  }

  async readById(subscriptionId: string) {
    const observable = await this.provider.readById(subscriptionId)

    return await firstValueFrom(observable)
  }
}
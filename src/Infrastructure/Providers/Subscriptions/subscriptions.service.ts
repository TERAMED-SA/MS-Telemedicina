import { Injectable } from "@nestjs/common";
import { HttpClient } from "../http/config";
import { SubscriptionFeature, SubscriptionResponseDto, VerifyUserAccessResponseDto } from "./dtos";
import { Observable } from "rxjs";

@Injectable()
export class SubscriptionServiceProvider {

  constructor(private readonly httpClient: HttpClient) { }

  async verifyFeatureAccess(userId: string, requiredFeature: SubscriptionFeature):
    Promise<
      Observable<VerifyUserAccessResponseDto>
    > {
    return this.httpClient.get<VerifyUserAccessResponseDto>(`/verify-access?userId=${userId}&feature=${requiredFeature}`);
  }

  async readById(subscriptionId: string):
    Promise<
      Observable<SubscriptionResponseDto | null>
    > {
    return this.httpClient.get<SubscriptionResponseDto>(`/${subscriptionId}`);
  }
}
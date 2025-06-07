import { SubscriptionFeature } from "./subscription.dto"

export type VerifyUserAccessResponseDto = {
  allowed: boolean,
  planId: string,
  features: SubscriptionFeature[]
}
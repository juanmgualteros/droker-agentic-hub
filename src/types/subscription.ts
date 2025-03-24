import { Subscription, Organization } from '@prisma/client'
import { PlanType, SubStatus } from '@prisma/client'

export type SubscriptionWithRelations = Subscription & {
  organization: Organization
} 
import { Subscription, Organization, SubscriptionType, SubStatus } from '@prisma/client'

export type SubscriptionWithRelations = Subscription & {
  organization: Organization
} 
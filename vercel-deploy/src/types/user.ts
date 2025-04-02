import { User, Organization } from '@prisma/client'

export type UserWithRelations = User & {
  organization: Organization | null
} 
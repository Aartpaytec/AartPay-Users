import type { User as DatabaseUser } from "@workspace/db";

export type PublicUser = Pick<
  DatabaseUser,
  "id" | "name" | "phone" | "balance"
>;

export function toPublicUser(user: PublicUser): PublicUser {
  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    balance: user.balance,
  };
}
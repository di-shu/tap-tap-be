export type UserType = 'player' | 'admin';
export interface TelegramUserType {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
}

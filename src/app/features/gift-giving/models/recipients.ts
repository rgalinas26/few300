export interface RecipientListModel {
  id: string;
  name: string;
  email: string;
  holidays: { id: string; description: string }[];
}

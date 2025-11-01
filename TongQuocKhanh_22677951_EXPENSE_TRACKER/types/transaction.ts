export interface Transaction {
  id: number;
  title: string;
  amount: number;
  createdAt: string;
  type: 'Thu' | 'Chi';
  isDeleted?: number; // 0 or 1 in SQLite
}

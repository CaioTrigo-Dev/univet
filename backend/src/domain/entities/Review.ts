export interface Review {
  id: string;
  vetId: string;
  tutorId: string;
  score: number;
  comment?: string;
  createdAt: Date;
}

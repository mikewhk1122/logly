
export enum BristolScale {
  Type1 = 1, // Separate hard lumps
  Type2 = 2, // Sausage-shaped but lumpy
  Type3 = 3, // Like a sausage but with cracks
  Type4 = 4, // Like a sausage or snake, smooth and soft
  Type5 = 5, // Soft blobs with clear-cut edges
  Type6 = 6, // Fluffy pieces with ragged edges
  Type7 = 7, // Watery, no solid pieces
}

export interface PoopPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  timestamp: number;
  bristolType: BristolScale;
  note?: string;
  imageUrl?: string;
  aiCommentary?: string;
  likes: number;
  comments: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  totalLogs: number;
}

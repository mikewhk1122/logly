
import { BristolScale } from './types';

export const BRISTOL_DESCRIPTIONS = {
  [BristolScale.Type1]: "Separate hard lumps (hard to pass)",
  [BristolScale.Type2]: "Sausage-shaped but lumpy",
  [BristolScale.Type3]: "Like a sausage but with cracks on the surface",
  [BristolScale.Type4]: "Like a sausage or snake, smooth and soft",
  [BristolScale.Type5]: "Soft blobs with clear-cut edges (passed easily)",
  [BristolScale.Type6]: "Fluffy pieces with ragged edges, a mushy stool",
  [BristolScale.Type7]: "Watery, no solid pieces (entirely liquid)",
};

export const MOCK_USERS = [
  {
    id: 'user-123',
    name: 'Alex Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    streak: 5,
    totalLogs: 42,
  },
  {
    id: 'user-456',
    name: 'Sarah Pooper',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    streak: 12,
    totalLogs: 142,
  },
  {
    id: 'user-789',
    name: 'Log Master Mike',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    streak: 8,
    totalLogs: 98,
  }
];

export const MOCK_USER = MOCK_USERS[0];

export type Guild = {
  id: string;
  title: string;
  imageUrl: string;
  backgroundUrl: string;
  totalMinted: number;
  totalMember: number;
  member: Friend[];
  rank: string;
};
export type Friend = {
  id: string;
  name: string;
  imageUrl: string;
  balance: number;
  totalFriend: number;
};

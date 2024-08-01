import { Achievement } from "@/types/quest";
export type CatConfig = {
  name: string;
  assetName: string;
  description: string;
  maxLevel: number;
  power: string;
  imgUrl: string;
};

export enum CatLevelType {
  Apron = "apron",
  Coat = "coat",
  Base = "base",
}

export enum CatAssetType {
  Base = "Cat",
  Aura = "Aura",
  Body = "Body",
  Face = "Face",
  Cape = "Cape",
  Hat = "Hat",
}

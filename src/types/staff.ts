export type UpgradeBody = {
  catId: string;
  catRequireIds?: string[];
};

export type RemoveBody = {
  catIds: string[];
};

export type RequireUpgradeBody = {
  level: number;
  catId: string;
};

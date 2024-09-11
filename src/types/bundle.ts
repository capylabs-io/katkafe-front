export type Bundle = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  item: [
    {
      name: string;
      value: string;
      imageUrl: string;
    }
  ];
};

export enum ShopType {
  Bundle = "Bundle",
  Cat = "Cat",
  Roll = "Roll",
}

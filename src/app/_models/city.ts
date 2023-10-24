export interface Category {
  color: string,
  name: string,
  score_out_of_10: number
}
export interface City {
  photos: any;
  categories: Category[],
  summary: string,
  teleport_city_score: number
  images: any;
}

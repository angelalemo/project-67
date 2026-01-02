export type PersonType = {
  id: string;
  name: string;
  nickname: string;
  phone_number: string;
  image_url: string | null;
  created_at?: string;
  updated_at?: string;
};
export const persons = [
  {
    id: 1,
    name: "Naruedon Mueangaudon",
    nickname: "Mark",
    phonenumber: "084-367-7079",
    image: "/images/people/mark.jpg",
  },
  {
    id: 2,
    name: "Yudsapak Panyapeng",
    nickname: "Golf",
    phonenumber: "084-367-7079",
    image: "/images/people/golf.jpg",
  },
  {
    id: 3,
    name: "Krittayou Karwkanlaya",
    nickname: "Google",
    phonenumber: "084-367-7079",
    image: "/images/people/google.jpg",
  },
  {
    id: 4,
    name: "Aun Ang",
    nickname: "Aun",
    phonenumber: "084-367-7079",
    image: "/images/people/Aun.png",
  },
  {
    id: 5,
    name: "Tudee Intharawijit",
    nickname: "Trudee",
    phonenumber: "084-367-7079",
    image: "/images/people/Tud.png",
  },
  {
    id: 6,
    name: "gell Namprom",
    nickname: "Gell",
    phonenumber: "084-367-7079",
    image: "/images/people/gel.png",
  },
]
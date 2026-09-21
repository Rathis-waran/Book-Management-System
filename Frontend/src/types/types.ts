export interface OrderItem {
  book_id: number;
  book_title: string;
  image_url: string;
  quantity: number;
  price: number;
}
export interface OrderResp {
  cart_id: number;
  totalamount: number;
  items: { book_id: number; quantity: number; price: number }[];
}
export interface Order {
  order_id: number;
  cart_id: number;
  totalamount: number;
  created_at?: string;
  book_id?: number;
  book_title?: string;
  image_url?: string;
  quantity?: number;
  price?: number;
}

import axios from "axios";
import type { OrderResp } from "../types/types";

export async function deleteBooks(bookId: number) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/books/delete/${bookId}`,
    );
    return response.data;
  } catch (error) {
    alert("This book may be in user's cart");
  }
}

export async function addtocart(book: any) {
  const quantity = 1;
  const cart_id = 1;
  const bookdata = {
    book_id: book.id,
    cart_id: cart_id,
    quantity: quantity,
  };
  try {
    const response = await axios.post(
      "http://localhost:3000/cart/item",
      bookdata,
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function addauthor(name: string) {
  try {
    const response = await axios.post("http://localhost:3000/author", name);
    return (response.data, alert("Author added successfully"));
  } catch (error) {
    return error;
  }
}

export async function fetchAuthor() {
  try {
    const response = await axios.get("http://localhost:3000/author");
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function deleteAuthor(authorId: number) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/author/delete/${authorId}`,
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function addbooks(bookData: any) {
  try {
    const response = await axios.post("http://localhost:3000/books", bookData);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function addcategories(category: { cat_name: string }) {
  try {
    console.log(category);

    const response = await axios.post(
      "http://localhost:3000/categories",
      category,
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function fetchcategory() {
  try {
    const response = await axios.get("http://localhost:3000/categories");
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function deleteCategory(categoryId: number) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/categories/delete/${categoryId}`,
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

// cart functional apis

export async function fetchCartItems(cartId: number) {
  try {
    const response = await axios.get(
      `http://localhost:3000/cart/${cartId}/items`,
    );

    return response.data;
  } catch (error) {
    return error;
  }
}

export async function updateCartItem({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}) {
  try {
    const response = await axios.put(`http://localhost:3000/cart/item/${id}`, {
      quantity,
    });

    return response.data;
  } catch (error) {
    return error;
  }
}

export async function deleteCartItem(id: number) {
  try {
    await axios.delete(`http://localhost:3000/cart/item/${id}`);
    return id;
  } catch (error) {
    return error;
  }
}

export async function cleanCarts(id: number) {
  try {
    const response = await axios.delete(`http://localhost:3000/cart/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

// coupon

export async function fetchCoupon() {
  try {
    const response = await axios.get("http://localhost:3000/coupon");
    return response.data;
  } catch (error) {
    return error;
  }
}

//login

export async function adminLogin(email: string, password: string) {
  try {
    const response = await axios.post("http://localhost:3000/adminlogin", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

// fetch books

export async function addBooks(page: number, limit: number, search: string) {
  try {
    const response = await axios.get("http://localhost:3000/books", {
      params: { page, limit, search },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

// reduce stock

export const reduceStock = async (bookId: number, quantity: number) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/books/updatestock/${bookId}`,
      {
        quantity,
      },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

// edit books

export async function editBooks(bookData: any, id: number) {
  try {
    const response = await axios.put(
      `http://localhost:3000/books/updatebooks/${id}`,
      bookData,
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

// add orders

export async function addOrders(order: OrderResp) {
  try {
    const response = await axios.post("http://localhost:3000/order/", order);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

//get orders

export async function getOrders() {
  try {
    const response = await axios.get("http://localhost:3000/order/allorders");
    return response.data;
  } catch (error) {
    return error;
  }
}

// update coupon status
export async function updatedStatus(id: number) {
  try {
    const response = await axios.put(`http://localhost:3000/coupon/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

import { createExpressServer } from "routing-controllers";
import dotenv from "dotenv";
import { BookController } from "./controller/bookController.js";
import { AuthorController } from "./controller/authorController.js";
import { CategoriesController } from "./controller/categoriesController.js";
import { AdminLoginControlller } from "./controller/adminloginController.js";
import { CartController } from "./controller/cartController.js";
import { CouponController } from "./controller/CouponController.js";
import { OrderController } from "./controller/orderController.js";
dotenv.config();
const app = createExpressServer({
  controllers: [
    BookController,
    AuthorController,
    CategoriesController,
    AdminLoginControlller,
    CartController,
    CouponController,
    OrderController,
  ],
  cors: { orign: "http://localhost:5173/", credentials: true },
});

app.listen(process.env.PORT, () => {
  console.log(`Server starts in the port: ${process.env.PORT}`);
});

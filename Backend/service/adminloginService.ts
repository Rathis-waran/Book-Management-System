export class AdminLoginService {
  adminLoginserv(body: any) {
    try {
      const { email, password } = body;
      if (email === "admin@gmail.com" && password === "admin@123") {
        return {
          redirectTo: "/adminpage/",
        };
      } else {
        return {
          message: "Enter Correct Credites",
        };
      }
    } catch (error) {
      return error;
    }
  }
}

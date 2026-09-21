import { useState } from "react";
import "../styles/login.css";
import { adminlogin, type login } from "../store/loginSlice";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginsubmit = async ({ email, password }: login) => {
    const result = await dispatch(adminlogin({ email, password })).unwrap();

    if (result.redirectTo) {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate(result.redirectTo, { replace: true });
    } else {
      alert("Enter correct Credentials !!!");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ border: "none" }}>
        <h2
          style={{
            background: "gray",
            padding: "159.5px 70px",
            marginTop: "6.5px",
            position: "relative",
            left: "20px",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
            color: "white",
          }}
        >
          Admin Login
        </h2>

        <form
          style={{ marginLeft: "20px" }}
          onSubmit={(e) => {
            e.preventDefault();
            loginsubmit({ email, password });
          }}
        >
          <div className="group">
            <label>Email</label>

            <input
              id="email"
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="group">
            <label>Password</label>

            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

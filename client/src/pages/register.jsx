import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegister = async () => {
    try {
      const newUser = await axios.post("http://localhost:5000/register", {
        formData,
      });
      navigate("/");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="p-10 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 w-[400px]">
        <h1 className="text-3xl">Register</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">username</label>
          <input
            className="border p-2 text-sm"
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">email</label>
          <input
            className="border p-2 text-sm"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">password</label>
          <input
            className="border p-2 text-sm"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="w-fit bg-amber-400 p-2" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

"use client";
import React from "react";

const Login = () => {
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    // Retrieve identifier from local storage when component mounts
    const storedIdentifier = localStorage.getItem("identifier");
    if (storedIdentifier) {
      setIdentifier(storedIdentifier);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost/peer-tutoring/backend/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ identifier, password, remember }),
        },
      );

      const data = await response.json();
      setMessage(data.message);

      if (remember) {
        // Save identifier to local storage when "Remember Me" is checked
        localStorage.setItem("identifier", identifier);
      } else {
        // Remove identifier from local storage if it exists
        localStorage.removeItem("identifier");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="identifier">Email or Username</label>
        <input
          type="text"
          id="login-identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>
          <input
            type="checkbox"
            id="remember"
            name="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button type="submit" className="rounded-md bg-red-700 p-3">
          Login
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;

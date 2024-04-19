"use client";
import React from "react";
import { jwtDecode } from "jwt-decode";

//To be able to recognize global variable "google"
declare global {
  interface Window {
    google: any;
  }
}

const GoogleLogin = () => {
  function handleCallbackResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwtDecode(response.credential);
    console.log(userObject);
  }

  React.useEffect(() => {
    /*global google*/
    window.google.accounts.id.initialize({
      client_id:
        "71610188910-7htm6j03np7j0veiudpb2s593mgp9nhk.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("sign-in-div"),
      {
        theme: "outline",
        size: "large",
        width: "250px",
      },
    );
  }, []);
  return (
    <div className="flex items-center justify-center">
      <div id="sign-in-div"></div>
    </div>
  );
};

export default GoogleLogin;

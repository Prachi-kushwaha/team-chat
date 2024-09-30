"use client"
import { useState } from "react";

import { SignInFlow } from "../types";
import { SignIncard } from "./sign-in";
import { SignUpcard } from "./sign-up";

const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("SignIn");
  return (
    <div className="h-screen flex items-center justify-center bg-[#5C3B58]">
      <div className="">{state === "SignIn" ? <SignIncard setState={setState} /> : <SignUpcard setState={setState} />}</div>
    </div>
  );
};

export default AuthScreen;

"use client"
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { TriangleAlert } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";

interface SignUpCardProps {
  setState :(state:SignInFlow) => void
}
export const SignUpcard = ({setState}:SignUpCardProps) => {
  const {signIn} = useAuthActions()

  const[name, setName] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if(password !== confirmPassword){
      setError("Passwords do not match")
      return
    }

    setPending(true)
    signIn("password", {name, email, password, flow:"signUp"})
    .catch(()=>{
      setError("Something went wrong")
    })
    .finally(()=>{
      setPending(false)
    })
  }


  const onProviderSignUp = (value:"github"|"google") => {
    setPending(true)
    signIn(value)
    .finally(() => {
      setPending(false)
    })
  }

  return (
    <Card className="w-auto h-auto p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          use your email or another services to continue
        </CardDescription>
      </CardHeader>
      {!!error&&(
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
           <TriangleAlert className="size-4"/>
           <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignUp} action="" className="space-y-2.5">
          <Input
            disabled={pending}
            value={name}
            onChange={(e) => {setName(e.target.value)}}
            placeholder="Name"
            required
          />
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            placeholder="Password"
            type="password"
            required
          />
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => {setConfirmPassword(e.target.value)}}
            placeholder="confirm password"
            type="password"
            required
          />
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => {onProviderSignUp("google")}}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
            continue with google
          </Button>
          <Button
            disabled={pending}
            onClick={() => {onProviderSignUp("github")}}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-2.5 left-2.5" />
            continue with github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">already login? <span onClick={()=>setState("SignIn")} className="text-sky-700 hover:underline cursor-pointer">Sign In</span></p>
      </CardContent>
    </Card>
  );
};

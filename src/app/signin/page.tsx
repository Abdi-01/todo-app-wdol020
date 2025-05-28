"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef } from "react";
import { apiCall } from "@/utils/apiHelper";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const [typePass, setTypePass] = React.useState<string>("password");

  const onHandleTypePass = () => {
    if (typePass === "password") {
      setTypePass("text");
    } else {
      setTypePass("password");
    }
  };

  const onSignIn = async () => {
    try {
      const email = inputEmailRef.current?.value;
      const password = inputPasswordRef.current?.value;

      if (email && password) {
        const response = await apiCall.get("/api/data/account", {
          params: {
            where: `email = '${email}' AND password = '${password}'`
          }
        });
        console.log(response.data);

        router.replace("/")
        toast(`Signin berhasil`);

      } else {
        // - Jika salah satu tidak terpenuhi maka diinfokan registrasi gagal
        throw "Isi semua form";
      }
    } catch (error: any) {
      console.log(error);
      toast(error);
    }
  };

  return (
    <div className="h-screen py-36">
      <div className="w-full md:w-1/3 m-auto h-fit">
        <Card>
          <CardHeader>
            <h1 className="text-2xl">Welcome</h1>
          </CardHeader>
          <CardContent>
            <div className="py-2 md:py-6 space-y-5">

              <Input type="email" placeholder="Email" ref={inputEmailRef} />
              <div className="flex items-center justify-between border border-gray-200 rounded-md pr-2">
                <Input
                  type={typePass}
                  placeholder="Password"
                  className="border-none shadow-none"
                  ref={inputPasswordRef}
                />
                <Button
                  type="button"
                  className="shadow-none p-0"
                  onClick={onHandleTypePass}
                >
                  {typePass === "password" ? (
                    <FaEye size={24} />
                  ) : (
                    <FaEyeSlash size={24} />
                  )}
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  onClick={onSignIn}
                  className="bg-gray-400 text-white px-2 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full shadow"
                >
                  Signin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;

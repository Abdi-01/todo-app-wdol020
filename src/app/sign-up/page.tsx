"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef } from "react";
import { apiCall } from "@/utils/apiHelper";
import { toast } from "react-toastify";

const SignUp = () => {
  const inputFirstnameRef = useRef<HTMLInputElement>(null);
  const inputLastnameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputConfPasswordRef = useRef<HTMLInputElement>(null);

  const [typePass, setTypePass] = React.useState<string>("password");

  const onHandleTypePass = () => {
    if (typePass === "password") {
      setTypePass("text");
    } else {
      setTypePass("password");
    }
  };

  const onSignUp = async () => {
    try {
      const firstname = inputFirstnameRef.current?.value;
      const lastname = inputLastnameRef.current?.value;
      const email = inputEmailRef.current?.value;
      const password = inputPasswordRef.current?.value;
      const confPassword = inputConfPasswordRef.current?.value;

      // - Memastikan bahwa setiap form input sudah diisi
      if (firstname && lastname && email && password && confPassword) {
        // - Memastikan password dan confirmation password nilainya sama
        if (password === confPassword) {
          // - Jika kondisi terpenuhi, data dikirim ke API
          const response = await apiCall.post("/api/data/account", {
            firstname,
            lastname,
            email,
            password,
          });
          console.log(response.data);

          toast(`Pendaftaran berhasil, cek email ${response.data.email} anda`);
        } else {
          throw "Password dan Confirmation Password tidak sesuai";
        }
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
            <h1 className="text-2xl">Sign up now</h1>
          </CardHeader>
          <CardContent>
            <div className="py-2 md:py-6 space-y-5">
              <div className="flex gap-8">
                <Input
                  type="text"
                  placeholder="Firstname"
                  ref={inputFirstnameRef}
                />
                <Input
                  type="text"
                  placeholder="Lastname"
                  ref={inputLastnameRef}
                />
              </div>
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
              <div className="flex items-center justify-between border border-gray-200 rounded-md pr-2">
                <Input
                  type={typePass}
                  placeholder="Confirmation Password"
                  className="border-none shadow-none"
                  ref={inputConfPasswordRef}
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
                  onClick={onSignUp}
                  className="bg-gray-400 text-white px-2 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full shadow"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;

"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const TodoPage = () => {

  return (
    <div>
      <div
        className="w-full h-48 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/light-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500 to-transparent -z-40" />
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex justify-between w-[40rem]">
          <h1 className="text-4xl font-bold tracking-widest text-white">
            Todo
          </h1>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => {
              if (localStorage.getItem("mode") === "light") {
                localStorage.setItem("mode", "dark");
              } else {
                localStorage.setItem("mode", "light");
              }
            }}
          >
            <Moon size={24} />
          </Button>
        </div>
      </div>

      <div className="w-[40rem] m-auto flex flex-col items-center">
        <Card className="w-full mt-[-50px] z-50 bg-white shadow-lg">
          <CardContent>
            <div className="relative">
              <Input
                type="text"
                placeholder="Create a new todo..."
                className="py-6 border-none shadow-none"
              />
              <Button
                type="button"
                className="absolute top-1/7 right-4"
              >
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full mt-4 shadow-lg">
          <CardContent className="p-5">

            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <span>
                0     items left
              </span>
              <div className="space-x-3">
                <Button
                  variant="link"
                  type="button"
                >
                  All
                </Button>
                <Button
                  variant="link"
                  type="button"
                >
                  Done
                </Button>
                <Button
                  variant="link"
                  type="button"
                >
                  Not Yet
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TodoPage;

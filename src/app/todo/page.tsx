"use client";

import { useRef, useState, useEffect, useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { apiCall } from "../../utils/apiHelper"
import { StyleModeContext } from "@/contexts/StyleModeContext";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { setMode } from "@/lib/redux/features/styleModeSlice";

interface ITodo {
  id: number;
  task: string;
  isDone: boolean;
  objectId: string;
}

const TodoPage = () => {
  const inputTaskRef = useRef<HTMLInputElement>(null); // mengakses informasi suatu element seperti document.getElement

  // Access global data from context
  // const { mode, setMode } = useContext(StyleModeContext);

  // Access global data from redux reducer
  // Mengambil data dari state reducer styleMode
  const mode = useAppSelector((state) => {
    return state.styleModeReducer.mode;
  })
  // Menjalankan fungsi action
  const dispatch = useAppDispatch();


  const [todos, setTodos] = useState<ITodo[]>([]); // penampung seluruh data todo

  const onBtDelete = async (objectId: string) => {
    // Cari index berdasarkan parameter id
    // const selectedIdx = todos.findIndex((value: ITodo) => value.id === id);
    // const temp: ITodo[] = [...todos];
    // temp.splice(selectedIdx, 1);
    // setTodos(temp);
    try {
      await apiCall.delete(`/api/data/todo/${objectId}`);

      fetchTodoList();
    } catch (err: any) {
      alert(err?.message);
    }
  };

  const onBtIsDone = async (objectId: string) => {
    try {
      // const selectedIdx = todos.findIndex((value: ITodo) => value.id === id);
      // melakukan reassign value pada property isDone berdasarkan index yang ditemukan
      // 1. Menyalin data dari todos ke variable sementara
      // const temp: ITodo[] = [...todos];
      // 2. Me-reassign nilai dari property isDone berdasarkan variable sementara
      // temp[selectedIdx].isDone = !temp[selectedIdx].isDone;
      // 3. Menyimpan data dari variable sementara ke state todos dengan setTodos
      // setTodos(temp);
      await apiCall.put(
        `api/data/todo/${objectId}`,
        { isDone: true }
      );

      fetchTodoList();
    } catch (err: any) {
      alert(err?.message);
    }
    // Cari index berdasarkan parameter id
  };

  const onBtAdd = async () => {
    try {
      // Memastikan apakah form input sudah diisi
      if (inputTaskRef.current?.value) {
        // Jika ada, tambahkan ke penampung data
        // setTodos([
        //   ...todos,
        //   {
        //     id: todos[todos.length - 1] ? todos[todos.length - 1].id + 1 : 1,
        //     task: inputTaskRef.current.value,
        //     isDone: false,
        //   },
        // ]);

        await apiCall.post("/api/data/todo", {
          task: inputTaskRef.current.value
        });

        // reset form input
        inputTaskRef.current.value = "";

        fetchTodoList();
      } else {
        // Jika tidak ada, berikan peringatan
        alert("Jangan biarkan form input kosong");
      }
    } catch (err: any) {
      alert(err?.message);
    }
  };

  const printTodo = () => {
    return (
      todos.length > 0 &&
      todos.map((value: ITodo, index: number) => {
        return (
          <li
            className="flex items-center justify-between border-b p-2 hover:shadow-md"
            key={index}
          >
            <div className="flex items-center gap-4">
              <Checkbox
                checked={value.isDone}
                className="rounded-full w-6 h-6 border-2 border-gray-400 cursor-pointer"
                onClick={() => onBtIsDone(value.objectId)}
              />
              <span>{value.task}</span>
            </div>
            <Button
              type="button"
              className="rounded-full p-0 w-8 h-8 bg-red-500 cursor-pointer"
              onClick={() => onBtDelete(value.objectId)}
            >
              <Trash size={24} />
            </Button>
          </li>
        );
      })
    );
  };

  const fetchTodoList = async () => {
    try {
      const todo = await apiCall.get("/api/data/todo");

      if (todo.statusText != "OK") throw new Error(todo.statusText);

      setTodos(todo.data);
    } catch (err: any) {
      alert(err?.message);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

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
            onClick={() => dispatch(setMode())}
          >
            {
              mode === "light" ?
                <Sun size={24} />
                :
                <Moon size={24} />
            }
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
                ref={inputTaskRef}
              />
              <Button
                type="button"
                className="absolute top-1/7 right-4 cursor-pointer"
                onClick={onBtAdd}
              >
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full mt-4 shadow-lg">
          <CardContent className="p-5">
            <ul>{printTodo()}</ul>
            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <span>
                {todos.length > 0 &&
                  todos.filter((value: ITodo) => value.isDone === false).length}
                items left
              </span>
              <div className="space-x-3">
                <Button variant="link" type="button">
                  All
                </Button>
                <Button variant="link" type="button">
                  Done
                </Button>
                <Button variant="link" type="button">
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

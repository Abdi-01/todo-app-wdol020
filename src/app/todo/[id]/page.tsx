import { apiCall } from "@/utils/apiHelper";
import React from "react"

interface ITodoDetailProps {
    params: { id: string }
}

const getTodoDetailbyId = async (id: string) => {
    try {
        const response = await apiCall.get("/api/data/todo", {
            params: {
                where: `objectId = '${id}'`
            }
        });
        console.log(response.data[0]);
        return response.data[0];
    } catch (error) {
        console.log(error);
    }
}

const TodoDetailPage: React.FunctionComponent<ITodoDetailProps> = async ({ params }) => {
    const todoDetail = await getTodoDetailbyId(params.id);
    return <div>
        <h1 className="text-4xl">TODO DETAIL {todoDetail?.task}</h1>
    </div>
}

export default TodoDetailPage
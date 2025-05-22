const todo = {
    id: 1,
    task: "makan",
    isDone: false
}

const newTodo = { ...todo };


newTodo.task = "Tidur"
console.log(todo);
console.log(newTodo);



// 
let age = 20;
let newAge = age;

console.log(age);
newAge = 30
console.log(newAge);
console.log(age);


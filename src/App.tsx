import { useForm, Controller } from "react-hook-form";
import './App.css'
import type { TodoEx } from './TodoListType';
import axios from "axios";

function App() {
  const {control, register, handleSubmit} = useForm<TodoEx>({
     defaultValues: {
      name: '',
      text: '',
      exerciseType: 'зовнішня',
    },
  })
  const onSubmit = async (data: any) => {
        await axios.post<TodoEx>("https://jsonplaceholder.typicode.com/posts", data)
        const oldTodos: TodoEx[] = JSON.parse(localStorage.getItem('todos') || '[]');
        const newTodos = [...oldTodos, data];
        localStorage.setItem('todos', JSON.stringify(newTodos));

      }
       const Todos: TodoEx[] = JSON.parse(localStorage.getItem('todos') || '[]');
  return (
    <>
        <form action="" onSubmit={handleSubmit(onSubmit)}>

          <label htmlFor="">
            Найменування
            <input 
            type="text"
            {...register('name')}/>
          </label>

          <label htmlFor="">
            Опис
            <textarea {...register('text')}></textarea>
          </label>        

          <Controller
            control={control}
            name='exerciseType'
            render={({field}) => (
              <button 
              className={field.value === 'зовнішня' ? 'external' : 'internal'}
              type ='button' 
              onClick={() => field.onChange(field.value === 'зовнішня' ? 'внутрішня' : 'зовнішня')}
              >
              {field.value}
              </button>
  )}/>
          <button type='submit'>send</button>
        </form>
              {Todos.map((todoItem) => <div key={todoItem.id}>{todoItem.id}, {todoItem.name}, </div>)}

    </>
  )
}

export default App

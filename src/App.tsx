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
    console.log(data)
        const response = await axios.post<TodoEx>("https://jsonplaceholder.typicode.com/posts", data)
        console.log()
  }

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
    </>
  )
}

export default App

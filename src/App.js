import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import './App.css';
import FormLogo from './assets/form-logo.png'

const schema = yup.object({
  name: yup.string().required("O nome é obrigatório"),
  email: yup.string().email("Digite um email válido").required("O email é obrigatório"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 dígitos").required("A senha é obrigatória"),
  confirmPassword: yup.string().required("Confirmar a senha é obrigatória").oneOf([yup.ref("password")], "As senhas devem ser iguais"),
}).required();

function App() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  function onSubmit(userData){
    console.log(userData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <img src={FormLogo} alt='image-logo' />
      <label>
        Nome
        <input type="text" {...register("name", { required: true })}/>
        <span>{errors.name?.message}</span>
      </label>
      <label>
        E-mail
        <input type="text" {...register("email")}/>
        <span>{errors.email?.message}</span>
      </label>
      <label>
        Senha
        <input type="password" {...register("password")}/>
        <span>{errors.password?.message}</span>
      </label>
      <label>
        Confirmar senha
        <input type="password" {...register("confirmPassword")}/>
        <span>{errors.confirmPassword?.message}</span>
      </label>
      <button type="submit">Cadatrar-se</button>
    </form>
  );
}

export default App;

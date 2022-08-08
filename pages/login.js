import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ins from "../assets/inscribete.png";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Wrapper = styled.div`
  padding-top: 50px;
  display: flex;
  max-width: 1140px;
  margin-right: auto;
  margin-left: auto;
  position: relative;
`;

const FormContainer = styled.div`
  width: 56.038%;
  min-height: 1px;
  transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
  padding: 30px 10px 0px 10px;
`;

const Title = styled.div`
  text-align: left;
  margin-bottom: 20px;
  animation: fadeInDown 2s;

`;

const SubTitle = styled.div`
  text-align: left;
  margin-bottom: 20px;
  /* animation: fadeInLeft 2s; */
  h6 {
    color: #00a89c;
    font-family: "Roboto Slab", Sans-serif;
    font-size: 27px;
    font-weight: 700;
    text-transform: none;
    line-height: 1.3;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  /* animation: fadeInRight 3s; */
  label {
    font-size: 25px;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  input {
    width: 400px;
    padding: 15px;
  }
  p {
    color: gray;
    a {
      text-decoration: none;
      color: #00a89c;
    }
  }
`;

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: row;
  button {
    margin-left: -100px;
    background-color: transparent;
    border: none;
    width: 100px;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  padding-top: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 20px;
  color: #038d84;
  font-size: 20px;
  &:hover {
    background-color: #ffb900;
    color: white;
  }
`;

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { email, password } = form;
  const router = useRouter();

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }
    try {
        
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/dashboard");
        setForm({ email: "", password: "" });
    }catch(err){
        setError("Contraseña o correo inválido intente de nuevo");
    }
    
    

  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  //Password visualization
  const [showPass, setShowPass] = useState(false);
  const handleShowPass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };
  return (
    <div className="w-full">
      <Wrapper>
        <FormContainer>
          <div className="mb-5 text-left">
            <h6 className="text[#5e6062] text-xl font-semibold uppercase [letter-spacing:2.1px]">Potencia tus fortalezas y complementa tus habilidades.</h6>
          </div>
          <SubTitle>
            <h6>Inscríbete en Wefinder</h6>
          </SubTitle>
          {error ? <div className="text-graySubTitle">{error}</div>:null}
          <Form onSubmit={handleSubmit}>
            <label>Correo Electrónico</label>
            <input
              type="text"
              placeholder="Ingrese su correo electrónico"
              id="inputEmail"
              name="email"
              onChange={(e) => handleChange(e)}
              value={form[email]}
              required
            />
            <label>Contraseña</label>
            <PasswordContainer>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Ingrese su contraseña"
                id="inputPassword"
                name="password"
                onChange={(e) => handleChange(e)}
                value={form[password]}
                required
              />
              <button onClick={handleShowPass}>Mostrar</button>
            </PasswordContainer>

            <ButtonContainer>
              <Button type="submit">Iniciar Sesión</Button>
            </ButtonContainer>
            <p>
              <span>¿No tienes cuenta? </span>
               <Link href="/signup">Inscríbete</Link> 
            </p>
          </Form>
        </FormContainer>
        <div className="w-[43.914%] min-h-[1px] animate-pulse">
          <div className="p-3 flex">
            <div className="w-full relative text-center">
              <Image src={ins} alt="inscribete" className="w-full object-contain h-[500px]" />
            </div>
          </div>
        </div> 
      </Wrapper>
    </div>
  );
}

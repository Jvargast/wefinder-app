import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, FieldValue, serverTimestamp } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
//import { registerInitiate } from "../../actions";
import ins from "../assets/inscribete.png";
//import db from "../../firebase";
import {useAuth} from "../context/AuthContext";
import { auth, db, database} from "../firebase";
import { doesUsernameExist } from "../services/firebase";

const Container = styled.div``;

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
  animation-name: fadeInDown;
  h6 {
    color: #5e6062;
    font-size: 21px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2.1px;
  }
`;

const SubTitle = styled.div`
  text-align: left;
  margin-bottom: 20px;
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
  animation: fadeInRight 3s;
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
    &.errmsg {
      background-color: lightpink;
      color: firebrick;
      font-weight: bold;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
    }
    &.offscreen {
      display: none;
    }
    &.instructions > svg {
      margin-right: 0.25rem;
    }
    &.instructions {
      font-size: 0.75rem;
      border-radius: 0.5rem;
      width: 100%;
      background: #000;
      color: #fff;
      padding: 0.25rem;
      position: relative;
      bottom: -10px;
      width: 400px;
    }
    .instructions {
      font-size: 0.75rem;
      border-radius: 0.5rem;
      background: #000;
      color: #fff;
      padding: 0.25rem;
      position: relative;
      bottom: -10px;
    }
    a {
      text-decoration: none;
      color: #00a89c;
    }
  }
`;

/* const Image = styled.div`
  width: 43.914%;
  min-height: 1px;
  animation: fadeInLeft 2s;
  div {
    padding: 10px;
    display: flex;
    div {
      width: 100%;
      position: relative;
      text-align: center;
      img {
        width: 100%;
        object-fit: contain;
        height: 500px;
        border-radius: 0 0 0 0;
      }
    }
  }
`; */

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

export default function Register(props) {
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    displayName: "",
    username:"",
    email: "",
    profilePic: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(state.email));
  }, [EMAIL_REGEX, state.email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(state.password));
    setValidMatch(state.password === state.confirmPassword);
  }, [state.password, state.confirmPassword, PWD_REGEX]);

  useEffect(() => {
    setErrMsg("");
  }, [state.email, state.password, state.confirmPassword]);

  /*   useEffect(()=>{
    if(user) {
        navigate("/dashboard")
    }
  },[user,navigate]); */

  const { displayName, username,email, profilePic, password, confirmPassword } = state;
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrMsg("Las contraseñas no coinciden")
      return;
    }
    const v2 = PWD_REGEX.test(password);
    const v3 = EMAIL_REGEX.test(email);
    if (!v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    setSuccess(true);

    const userNameExist = await doesUsernameExist(username);

    if(!userNameExist) {
      try {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
          displayName:displayName,
          photoURL:profilePic
        });
        await addDoc(collection(db, "users"), {
          userId: auth.currentUser.uid,
          username: username,
          displayName: displayName,
          profilePic: profilePic,
          email: email,
          following: [],
          followers:[],
          dateCreatedAt: Date.now()
        });
        
        router.push("/dashboard");
        setLoading(false);
        setState({
          displayName: "",
          email: "",
          profilePic: "",
          password: "",
          confirmPassword: "",
        });
    
      } catch (error){
        setErrMsg(error)
      }
    }else {
      setErrMsg("Usuario ya registrado, intente de nuevo")
    }
  };

  const handleChange = (e) => {
    setState((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrMsg("");
  };
  return (
    <Container>
      <Wrapper>
        <FormContainer>
          <Title>
            <h6>Potencia tus fortalezas y complementa tus habilidades.</h6>
          </Title>
          <SubTitle>
            <h6>Inscríbete en Wefinder</h6>
          </SubTitle>
          {errMsg ? <div className="text-graySubTitle">{errMsg}</div>:null}
          <Form onSubmit={handleSubmit}>
            <label>Nombre Completo</label>
            <input
              type="text"
              placeholder="Ingrese su nombre"
              id="inputName"
              onChange={(e) => handleChange(e)}
              value={state[displayName]}
              name="displayName"
              required
            ></input>
            <label>Nombre de usuario</label>
            <input
              type="text"
              placeholder="Ingrese su usuario"
              id="inputUsername"
              onChange={(e) => handleChange(e)}
              value={state[username]}
              name="username"
              required
            ></input>
            <label>Correo</label>
            <input
              type="text"
              placeholder="Ingrese su correo"
              id="inputEmail"
              onChange={(e) => handleChange(e)}
              value={state[email]}
              name="email"
              required
              aria-invalid={validEmail ? "false" : "true"}
            ></input>
            <p
              id="emailnote"
              className={
                state.email && !validEmail ? "instructions" : "offscreen"
              }
            >
              Escribe un email válido
            </p>
            <label>URL foto de perfil</label>
            <input
              type="text"
              placeholder="Foto de perfil"
              id="inputProfilePic"
              onChange={(e) => handleChange(e)}
              value={state[profilePic]}
              name="profilePic"
            ></input>
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              id="inputPassword"
              onChange={(e) => handleChange(e)}
              value={state[password]}
              name="password"
              required
              aria-invalid={validPwd ? "false" : "true"}
            ></input>
            <p
                id="pwdnote"
                className={state.password && !validPwd ? "instructions" : "offscreen"}
              >
                8 a 24 caracteres.
                <br />
                Se deben incluir letras mayúsculas y minúsculas, un número y un
                caracter especial
                <br />
                Caracteres especiales:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
            <label>Confirmar contraseña</label>
            <input
              type="password"
              placeholder="Repita la contraseña"
              id="inputConfirmPassword"
              onChange={(e) => handleChange(e)}
              value={state[confirmPassword]}
              name="confirmPassword"
              required
              aria-invalid={validMatch ? "false" : "true"}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            ></input>
            <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                Debe calzar con la primera contraseña
              </p>
              {loading ? <div className="mt-4 text-sm text-tahiti">Cargando...</div>: <div></div>}
            <ButtonContainer>
              <Button type="submit">Inscríbete</Button>
              
            </ButtonContainer>
            
            <p>
              <span>¿Ya tienes cuenta? </span>
              <Link href="/login">Acceder</Link>
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
    </Container>
  );
};
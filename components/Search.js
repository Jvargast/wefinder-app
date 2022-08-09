import React, { useState } from "react";
import styled from "styled-components";

export default function Search() {
    const [entrada, setEntrada] = useState("");
    const handleSearch=()=>{
        //recibe entrada y busca según entrada -->
        //Búsqueda por correo
      }
  return (
    <SearchContainer>
      <div>
        <input
          type="text"
          placeholder="Buscar"
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
        />
      </div>
      <SearchIcon onClick={handleSearch}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          data-supported-dps="16x16"
          fill="currentColor"
          width="16"
          height="16"
          focusable="false"
        >
          <path d="M14.56 12.44L11.3 9.18a5.51 5.51 0 10-2.12 2.12l3.26 3.26a1.5 1.5 0 102.12-2.12zM3 6.5A3.5 3.5 0 116.5 10 3.5 3.5 0 013 6.5z"></path>
        </svg>
      </SearchIcon>
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  opacity: 1;
  position: relative;
  width: 50%;
  & > div {
    max-width: 608px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 608px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      height: 34px;
      border-color: #ffb900;
      vertical-align: text-top;
      font-size: 14px;
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 10;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

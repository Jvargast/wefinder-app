import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import search from "../assets/search-icon.svg"
import Members from './Members';
import Search from './Search';

const Container = styled.div`
  margin-top: 82px;
  max-width: 100%;
`;
/* const Content = styled.div`
    max-width: 1128px;
    margin-left: auto;
    margin-right: auto;
`; */

const SearchContainer = styled.div`
  padding-bottom: 20px;
  padding-top: 10px;
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  header {
    padding-left: 2rem;
    padding-right: 2rem;
    margin: 0 auto;
    max-width: 80rem;
    display: block;
    div {
      display: flex;
      align-items: center;
      h1 {
        --tw-text-opacity: 1;
        color: rgb(10 10 10/var(--tw-text-opacity));
        letter-spacing: -.025em;
        font-weight: 800;
        font-size: 1.875rem;
        width: 25%;
      }
    }
  }
  @media (min-width: 480px) {
    align-items: center;
  }
`;



function Network() {
  
  
  /* useEffect(()=> {
    async function getUsers() {
        if (username!= null){
          
            const [user] = await getUserByUsername(username);
            const photos = await getUserPhotosByUsername(username);
            dispatch({profile:user, infoCollection:photos, followerCount:user.followers.length})
        }
        
    }
    getUsers()
  },[username]); */

  return (
    <Container>
      <SearchContainer>
        <header>
          <div>
            <h1>Buscar</h1>
            <Search/>
          </div>
        </header>
      </SearchContainer>
      <Members />

    </Container>
  )
}

export default Network
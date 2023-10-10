import { createGlobalStyle } from "styled-components";
export const GlobalStyled = createGlobalStyle`
  /* init */
  :root {
    /* color */
    --color-primary:green;
    --color-background:#000;
    --color-foreground:#ccc;
    --color-hover:#fff;
    --color-layout:coral;
    --color-button-background:#000;
    --color-button-foreground:#ccc;
    --color-button-background-hover:black;
    --color-button-foreground-hover:coral;
    --color-form-background:#111;
    --color-background-hover:black;
    --color-foreground-hover:coral;
    /* component colors */
    --color-navigation-background:#000;
    --color-page-background:#222;
    /* rem */
    --rem-small:2rem;
    --rem-medium:5rem;
    /* element sizes */
    --nav-height:50px;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  /* layout */
  body {
    max-width:100vw;
    height:100%;
    background-color:var(--color-background);
    color:var(--color-foreground);
  }
  header {
    position:fixed;
    left:0;
    right:0;
    top:0;
    z-index:100;
    /* font-size: 1rem; */
    /* background-color: rgba(0,0,0,0.5); */
    backdrop-filter: blur(3px);
    /* border: 2px solid; */
    section {
      /* width: 80%; */
      /* max-width:1000px; */
      margin: auto;
      outline: 2px dashed;
      nav{
      }
    }
  }
  main {
    /* background-color: var(--color-page-background); */
    /* border: 2px solid; */
    overflow:hidden;
    section {
      /* width: 80%; */
      max-width:1000px;
      min-height:100vh;
      padding-top:100px;
      /* min-height: calc(100vh - var(--nav-height)); */
      margin: auto;
      outline: 2px dashed;
    }
  }

  /* elements */
  a {
    /* height:100%; */
    text-decoration:none;
    color:inherit;
    &:hover {
      cursor: pointer;
      color: var(--color-hover);
    }
  }
  html button {
    cursor: pointer;
    border:none;
    padding: 0.5rem;
    background-color:inherit;
    color:inherit;
    &:hover {
      background-color:#000;
      color:#fff;
    }
  }
  html body .general-button {
    padding: 0.5rem;
    border-radius: 3px;
    background-color: #333;
    color: #ddd;
    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
  html body .create-button{
    padding: 0.5rem;
    border-radius: 3px;
    background-color: #00aaff;
    color: #fff;
    &:hover {
      background-color: #000;
      color: #fff;
    }
    &:disabled {
      cursor: not-allowed;
    }
  }
  html body .delete-button{
    padding: 0.5rem;
    border-radius: 3px;
    background-color: #c15151;
    color: #fff;
    &:hover {
      background-color: #000;
      color: #fff;
    }
    &:disabled {
      cursor: not-allowed;
    }
  }
  html body .cancel-button,
  html body .close-button {
    padding: 0.5rem;
    border-radius: 3px;
    background-color: #333;
    color: #ddd;
    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit:cover;
  }
  ul{
  }
  li{
    list-style:none;
  }
  p {
    font-size: 14px;
  }
  hr {
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    /* border-bottom-width: 1px; */
    border-bottom: 1px solid #bbbfbf;
  }
  input, textarea {
    padding: .5rem;
  }
`;

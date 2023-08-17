import { createGlobalStyle } from "styled-components";
export const GlobalStyled = createGlobalStyle`
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
  body {
    height:100%;
    background-color:var(--color-background);
    color:var(--color-foreground);
    header {
      /* display:none; */
      position:fixed;
      left:0;
      right:0;
      top:0;
      z-index:100;
      padding:10px 0;
      /* border: 2px solid; */
      section {
        height:100%;
        width: 80%;
        max-width:1000px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        /* outline: 2px dashed; */
      }
    }
    main {
      padding-top: var(--nav-height);
      background-color: var(--color-page-background);
      /* border: 2px solid; */
      section {
        width: 80%;
        max-width:1000px;
        min-height: calc(100vh - var(--nav-height));
        margin: auto;
        outline: 2px dashed;
      }
    }
  }
  a {
    text-decoration:none;
    color:inherit;
    &:hover {
      color: var(--color-hover);
    }
  }
  header button,
  main button {
    border:none;
    background-color:#222;
    color:#ccc;
    cursor: pointer;
    &:hover {
      background-color:var(--color-primary);
      color:#fff;
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


`;

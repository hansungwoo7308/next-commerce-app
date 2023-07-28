import { createGlobalStyle } from "styled-components";
export const GlobalStyled = createGlobalStyle`
  :root {
    /* color */
    --color-background:#000;
    --color-foreground:#ccc;
    --color-hover:#fff;
    --color-layout:green;
    --color-button-background:#000;
    --color-button-foreground:#ccc;
    --color-button-background-hover:black;
    --color-button-foreground-hover:coral;
    --color-background-hover:black;
    --color-foreground-hover:coral;
    /* rem */
    --rem-small:2rem;
    --rem-medium:5rem;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  body {
    background-color:var(--color-background);
    color:var(--color-foreground);
    header {
      border: 2px solid;
      section {
        width: 80%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        outline: 2px dashed var(--color-layout);
      }
    }
    main {
      border: 2px solid;
      section {
        width: 80%;
        margin: auto;
        outline: 2px dashed var(--color-layout);
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
  button {
    border:none;
    font-size:inherit;
    background-color:var(--color-button-background);
    color:var(--color-button-foreground);
    cursor: pointer;
    &:hover {
      /* background-color:var(--color-button-background-hover); */
      color:var(--color-button-foreground-hover);


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


`;

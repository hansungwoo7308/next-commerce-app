import { createGlobalStyle } from "styled-components";

const styled = { createGlobalStyle };

export const GlobalStyled = styled.createGlobalStyle`
  /* Root Varaibles */
  :root {
    /* COLOR */

    /* according to importance */
    --color-primary: green;

    /* according to features */
    --color-layout-background: #000;
    --color-layout-color: #fff;

    --color-hover: #fff;
    --color-layout: coral;
    --color-button-background: #000;
    --color-button-foreground: #ccc;
    --color-button-background-hover: black;
    --color-button-foreground-hover: coral;
    --color-form-background: #111;
    --color-background-hover: black;
    --color-foreground-hover: coral;

    /* component colors */
    --color-navigation-background: #000;
    --color-page-background: #222;

    /* element sizes */
    --nav-height: 50px;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  /* layout */
  html,
  body {
    width: 100vw;
    overflow-x: hidden;
  }
  body {
    background-color: var(--color-layout-background);
    color: var(--color-layout-color);
  }
  header {
    width: 100vw;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(3px);
    /* font-size: 1rem; */
    /* background-color: rgba(0,0,0,0.5); */
    .section-outer {
      /* border: 1px solid yellow; */
      section {
        max-width: 1000px;
        margin: auto;
        /* outline: 2px dashed green; */
      }
    }

    @media (max-width: 1000px), (width <= 1000px) {
      nav .nav-belt .nav-belt-right {
        .account-icon.WEB {
          display: none;
        }
        .account-icon.MOBILE {
          display: flex;
        }
      }
    }
  }
  main {
    width: 100vw;
    overflow-x: hidden;
    /* border: 2px solid; */
    section {
      /* width: 80%; */
      width: 100%;
      max-width: 1000px;
      min-height: 100vh;
      padding-top: 100px;
      /* min-height: calc(100vh - var(--nav-height)); */
      margin: auto;
      outline: 2px dashed;
    }
  }
  footer {
    @media (max-width: 500px), (width <= 500px) {
      background-attachment: initial !important;
      .footer-content {
        flex-direction: column;
      }
    }
  }

  /* elements */
  a {
    /* height:100%; */
    text-decoration: none;
    color: inherit;
    &:hover {
      cursor: pointer;
      color: var(--color-hover);
    }
  }
  html body {
    button,
    .signin-form button,
    .signup-form button {
      cursor: pointer;
      border: none;
      padding: 0.5rem;
      background-color: inherit;
      color: #fff;
      &:hover {
        background-color: #000;
      }
    }
  }
  html body .general-button {
    padding: 0.5rem;
    border-radius: 5px;
    background-color: #333;
    color: #ddd;
    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
  html body .create-button {
    padding: 0.5rem;
    border-radius: 5px;
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
  html body .buy-button,
  html body .pay-button,
  html body .add-button {
    padding: 0.5rem;
    border-radius: 5px;
    /* background-color: #c15151; */
    /* background-color: #fff; */
    background-color: #67b34bec;
    color: #fff;
    &:hover {
      background-color: #000;
      color: #fff;
    }
    &:disabled {
      cursor: not-allowed;
    }
  }
  html body .edit-button,
  html body .update-button {
    padding: 0.5rem;
    border-radius: 5px;
    /* background-color: #c15151; */
    /* background-color: #fff; */
    background-color: #ff9800;
    color: #fff;
    &:hover {
      background-color: #000;
      color: #fff;
    }
    &:disabled {
      cursor: not-allowed;
    }
  }
  html body .delete-button {
    padding: 0.5rem;
    border-radius: 5px;
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
    border-radius: 5px;
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
    object-fit: cover;
  }
  ul {
  }
  li {
    list-style: none;
  }
  p,
  span,
  label {
    font-size: 14px;
  }
  hr {
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    /* border-bottom-width: 1px; */
    border-bottom: 1px solid;
    border-color: #fff;
  }
  input,
  textarea {
    /* padding: .5rem; */
    padding: 3px;
  }
`;

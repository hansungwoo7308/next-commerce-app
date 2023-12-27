import { createGlobalStyle, css } from "styled-components";

const styled = { createGlobalStyle };

export const GlobalStyled = styled.createGlobalStyle`
  :root {
    /* according to features */
    --color-hover: #fff;
    --color-layout: coral;
    --color-button-background: #000;
    --color-button-foreground: #ccc;
    --color-button-background-hover: black;
    --color-button-foreground-hover: coral;
    --color-form-background: #111;
    --color-background-hover: black;
    --color-foreground-hover: coral;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  /* theme */
  ${({ theme }: any) => {
    // console.log({ theme });

    if (theme === "dark") {
      return css`
        html body {
          header {
            .nav-belt-outer {
              background-color: #111;
            }

            .nav-main-outer {
              background-color: #222;

              button {
                color: #fff;
              }
            }
          }

          main {
            background-color: #000;
            color: white;

            /* home */
            .category .card {
              background-color: #424242;
            }

            .best-sellers,
            .new-arrivals {
              background-color: #212121;
            }

            /* all products */
            .box {
              background-color: #212121;
              border: 1px solid #424242;
            }
            .pagination.box {
              color: #424242;

              button {
                color: #fff;
              }
            }
          }
        }
      `;
    }

    if (theme === "light") {
      return css`
        html body {
          header {
            .nav-belt-outer {
              background-color: #33691e;
            }
            .nav-main-outer {
              background-color: #7cb342;
            }
          }

          main {
            background-color: #c5e1a5;
            color: black;

            /* home */
            .category .card {
              background-color: #aed581;
            }

            .best-sellers,
            .new-arrivals {
              background-color: #dcedc8;
            }

            /* all products */
            .box {
              background-color: #8bc34a;
              border: 1px solid #689f38;
            }
            .pagination.box {
              color: #689f38;
            }
          }
        }
      `;
    }
  }}

  /* layout */
  html body {
    width: 100vw;
    overflow-x: hidden;

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
      color: #fff;

      .nav-belt-outer {
        /* border: 1px solid yellow; */

        section {
          max-width: 1000px;
          margin: auto;
          /* outline: 2px dashed green; */
        }
      }

      .nav-main-outer {
        button {
          background-color: transparent;
        }
      }

      @media (max-width: 1000px), (width <= 1000px) {
        nav .nav-belt .nav-belt-right {
          .account-icon .avatar-outer {
            cursor: pointer;
            &:hover + .hover-menu {
              display: none;
            }
          }
        }
      }
    }

    main {
      width: 100vw;
      overflow-x: hidden;
      padding-top: 100px;
      padding-bottom: 5rem;
      /* border: 2px solid; */

      section {
        /* width: 80%; */
        width: 100%;
        max-width: 1000px;
        min-height: 100vh;
        margin: auto;
        /* outline: 2px dashed; */
      }

      /* slick-slider controller (left and right arrows) */
      .slick-slider-controller {
        button {
          background-color: transparent;
          &:hover {
            background-color: rgba(0, 0, 0, 0.5);
          }
        }
      }
    }

    footer {
      color: #fff;

      @media (max-width: 500px), (width <= 500px) {
        background-attachment: initial !important;
        .footer-content {
          flex-direction: column;
        }
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

  button {
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    /* background-color: transparent; */

    &:disabled {
      opacity: 0.5;
      /* background-color: #333;
      color: #fff; */
      cursor: default;
    }
    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
  html body .general-button {
    padding: 0.5rem;
    border-radius: 5px;
    background-color: #333;
    color: #ddd;
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
  }
  html body .buy-button,
  html body .pay-button,
  html body .add-button {
    padding: 0.5rem;
    border-radius: 5px;
    /* background-color: #67b34bec; */
    background-color: #1b5e20;
    color: #fff;
    &:hover {
      background-color: #000;
      color: #fff;
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
      background-color: #c15151;
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

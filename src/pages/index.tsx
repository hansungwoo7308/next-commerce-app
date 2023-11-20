import Head from "next/head";
import SlickSlider from "@/components/performance/SlickSlider";
import { styled } from "styled-components";
import connectDB from "lib/server/config/connectDB";
import Product from "lib/server/models/Product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export async function getServerSideProps({ req, query }: any) {
  console.log(`\x1b[33m\n[${req.url}]:::[${req.method}]\x1b[30m`);

  await connectDB();
  const randomProducts = await Product.aggregate([{ $sample: { size: 9 } }]).exec();
  const recentProducts = await Product.aggregate([
    { $sort: { createdAt: -1 } },
    { $limit: 12 },
  ]).exec();
  const products = { randomProducts, recentProducts };
  // console.log({ products });

  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}

const data = [
  {
    id: "slide-01",
    url: "https://res.cloudinary.com/dzktdrw7o/image/upload/v1700288057/next-commerce-app/pages/home/henry-chen-pS6ym8ocU7Y-unsplash_aydbmu.jpg",
  },
  {
    id: "slide-02",
    url: "https://res.cloudinary.com/dzktdrw7o/image/upload/v1700059928/next-commerce-app/pages/home/paul-steuber-rs11hu-bkTc-unsplash_kzxwfs.jpg",
  },
  {
    id: "slide-03",
    url: "https://res.cloudinary.com/dzktdrw7o/image/upload/v1700288045/next-commerce-app/pages/home/francesca-grima-vwZo1zAYPws-unsplash_arzayy.jpg",
  },
  {
    id: "slide-04",
    url: "https://res.cloudinary.com/dzktdrw7o/image/upload/v1700288073/next-commerce-app/pages/home/laura-chouette-FTaKIJ_uEo0-unsplash_s5lcvp.jpg",
  },
  {
    id: "slide-05",
    url: "https://res.cloudinary.com/dzktdrw7o/image/upload/v1700288079/next-commerce-app/pages/home/laurenz-heymann-al6s6JpnZis-unsplash_sp8mjk.jpg",
  },
];

// const DOMAIN =
//   process.env.NODE_ENV === "production"
//     ? process.env.NEXT_PUBLIC_BASE_URL
//     : // process.env.NODE_ENV==='development' ? process.env.NEXT_PUBLIC_BASE_URL:
//       process.env.NEXT_PUBLIC_ENV;

export default function Home({ products }: any) {
  const { randomProducts, recentProducts } = products;
  const [deviceEnv, setDeviceEnv] = useState("web");

  const randomItems = randomProducts.map((product: any) => ({
    id: product._id,
    url: product.images[0].url,
    text: product.name,
  }));
  const recentItems = recentProducts.map((product: any) => ({
    id: product._id,
    url: product.images[0].url,
    text: product.name,
  }));

  // useEffect(() => console.log({ domain: DOMAIN }), []);
  // useEffect(() => console.log({ products }), []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setDeviceEnv("mobile");
      } else if (window.innerWidth <= 1000) {
        setDeviceEnv("tablet");
      } else {
        setDeviceEnv("web");
      }
    };

    // 페이지 로드 및 화면 크기 변경 이벤트에 대한 이벤트 리스너 등록
    handleResize(); // 페이지 로드시 초기 설정 적용
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Head>
        <title>youserstack E-Commerce</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main className="home-page">
        <section className="banner">
          <SlickSlider
            items={data}
            itemSize={{ width: 1000, height: 1000 }}
            sliderSize={{ height: 300 }}
            settings={{
              centerMode: true,
              slidesToShow: 1,
              centerPadding: 0,
              dots: true,
              // speed: 1000,
              // autoplay:true,
              // autoplaySpeed: 5000,
              // pauseOnHover:true
            }}
          />
        </section>
        <section className="hero">
          <div className="hero-category">
            <div className="card">
              <h1>Electronics</h1>
              <Link href={"/products?category=electronics"}>
                <Image
                  src={"/images/category/electronics.jpg"}
                  alt="alt"
                  width={300}
                  height={300}
                />
              </Link>
            </div>
            <div className="card">
              <h1>Furnitures</h1>
              <Link href={"/products?category=furnitures"}>
                <Image src={"/images/category/furnitures.jpg"} alt="alt" width={300} height={300} />
              </Link>
            </div>
            <div className="card">
              <h1>Cosmetics</h1>
              <Link href={"/products?category=cosmetics"}>
                <Image src={"/images/category/cosmetics.jpg"} alt="alt" width={300} height={300} />
              </Link>
            </div>
            <div className="card">
              <h1>Fashion</h1>
              <Link href={"/products?category=fashion"}>
                <Image src={"/images/category/fashion.jpg"} alt="alt" width={300} height={300} />
              </Link>
            </div>
          </div>

          <div className="hero-content">
            <div className="best-sellers">
              <h1>Best Sellers</h1>
              {randomProducts && (
                <SlickSlider
                  items={randomItems}
                  itemSize={{ width: 300, height: 200 }}
                  actionType="VIEW_IMAGE"
                  settings={
                    deviceEnv === "mobile"
                      ? {
                          slidesToShow: 1,
                          slidesToScroll: 1,
                        }
                      : deviceEnv === "tablet"
                      ? {
                          slidesToShow: 2,
                          slidesToScroll: 2,
                        }
                      : deviceEnv === "web"
                      ? {
                          slidesToShow: 3,
                          slidesToScroll: 3,
                        }
                      : {}
                  }
                />
              )}
            </div>
            <div className="new-arrivals">
              <h1>New Arrivals</h1>
              {recentProducts && (
                <SlickSlider
                  items={recentItems}
                  itemSize={{ width: 300, height: 200 }}
                  actionType="VIEW_IMAGE"
                  settings={
                    deviceEnv === "mobile"
                      ? {
                          slidesToShow: 1,
                          slidesToScroll: 1,
                        }
                      : deviceEnv === "tablet"
                      ? {
                          slidesToShow: 2,
                          slidesToScroll: 2,
                        }
                      : deviceEnv === "web"
                      ? {
                          slidesToShow: 4,
                          slidesToScroll: 4,
                        }
                      : {}
                  }
                />
              )}
            </div>
          </div>
        </section>
        {/* <section></section>
        <section></section>
        <section></section> */}
      </Main>
    </>
  );
}

const Main = styled.main`
  .banner {
    /* max-width: initial; */
    min-height: initial;
    /* height: 300px; */
    .slick-slider {
      /* overflow-x: visible; */
      overflow-y: clip;
      .slick-list {
        overflow: visible;
        .slick-track {
          margin: 0;
        }
      }
    }
    .controller {
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 50%;
      /* width: 1000px; */
      width: 100%;
      max-width: 1000px;
      height: 100%;
      transform: translateX(-50%);
      .arrow {
        pointer-events: initial;
      }
    }
  }
  .hero {
    &::before {
      content: "";
      position: absolute;
      top: 400px;
      left: 0;
      width: 100vw;
      height: 500px;
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)),
        url("/images/antoine-le-idiwVxHqmGg-unsplash.jpg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      z-index: -1;
      /* border: 1px solid red; */
    }

    .hero-category {
      padding: 100px 1rem;

      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(auto, 200px));
      justify-content: center;
      gap: 1rem;

      .card {
        height: 200px;
        background-color: #fff;
        border-radius: 10px;
        color: #000;
        overflow: hidden;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        a {
          overflow: hidden;
        }
      }
      @media (max-width: 500px), (width <= 500px) {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      gap: 3rem;

      .best-sellers,
      .new-arrivals,
      .recommendations {
        /* background-color: #333; */
        background-color: #172f3e;
        padding: 3rem 1rem;
        > h1 {
          margin-bottom: 1rem;
        }
      }
      .best-sellers,
      .new-arrivals {
        .slick-slide {
          padding: 0 1rem;
          .img-outer {
            border-radius: 10px;
            overflow: hidden;
            &:hover {
              img {
                transform: scale(1.1);
              }
              .text {
                display: flex;
              }
            }

            img,
            .text {
              transition: all 0.5s;
            }
          }
          @media (max-width: 500px), (width <= 500px) {
            padding: 10px;
          }
        }
        .controller {
          .arrow {
            height: 5rem;
            border-radius: 50%;
          }
        }
      }
    }
  }
`;

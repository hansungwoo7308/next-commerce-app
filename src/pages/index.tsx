import Head from "next/head";
import SlickSlider from "@/components/performance/SlickSlider";
import { styled } from "styled-components";
import connectDB from "lib/server/config/connectDB";
import Product from "lib/server/models/Product";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export async function getServerSideProps({ req, query }: any) {
  console.log(`\x1b[33m\n[${req.url}]:::[${req.method}]\x1b[30m`);
  // console.log({ "Object.keys(req)": Object.keys(req) });
  // console.log({ "Object.entries(req)": Object.entries(req) });

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
    url: "/images/slide-01.jpg",
  },
  {
    id: "slide-02",
    url: "/images/slide-02.jpg",
  },
  {
    id: "slide-03",
    url: "/images/slide-01.jpg",
  },
  {
    id: "slide-04",
    url: "/images/slide-02.jpg",
  },
  {
    id: "slide-05",
    url: "/images/slide-01.jpg",
  },
];

const DOMAIN =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL
    : // process.env.NODE_ENV==='development' ? process.env.NEXT_PUBLIC_BASE_URL:
      process.env.NEXT_PUBLIC_ENV;

export default function Home({ products }: any) {
  const { randomProducts, recentProducts } = products;

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

  useEffect(() => console.log({ domain: DOMAIN }), []);
  // useEffect(() => console.log({ products }), []);

  return (
    <>
      <Head>
        <title>youserstack E-Commerce</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
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
          {/* <ul className="hero-category">
            {products.map((product: any) => (
              <li className="card">
                <Image src={product.images[0].url} alt="alt" width={300} height={300} />
                <h1>{product.name}</h1>
              </li>
            ))}
          </ul> */}
          <div className="best-sellers">
            <h1>Best Sellers</h1>
            {randomProducts && (
              <SlickSlider
                items={randomItems}
                itemSize={{ width: 300, height: 200 }}
                actionType="VIEW_IMAGE"
                settings={{
                  slidesToShow: 3,
                  slidesToScroll: 3,
                }}
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
                settings={{
                  slidesToShow: 4,
                  slidesToScroll: 4,
                }}
              />
            )}
          </div>
          <div className="recommendations">
            <h1>Recommendations</h1>
          </div>
        </section>
        <section></section>
        <section></section>
        <section></section>
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
    }
    .slick-list {
      overflow: visible;
      .slick-track {
        margin: 0;
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
    display: flex;
    flex-direction: column;
    gap: 3rem;
    .hero-category,
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
    .hero-category {
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
    }
    .best-sellers,
    .new-arrivals {
      .slick-slide {
        padding: 0 1rem;
        .img-outer {
          border-radius: 10px;
          overflow: hidden;
          &:hover img {
            transform: scale(1.1);
          }
          &:hover .text {
            display: flex;
          }
          img,
          .text {
            transition: all 0.5s;
          }
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
`;

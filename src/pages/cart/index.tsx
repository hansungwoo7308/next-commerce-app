import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reloadCart } from "lib/client/store/cartSlice";
import { setNotify } from "lib/client/store/notifySlice";
import { getData } from "lib/public/fetchData";
import styled from "styled-components";
import { toast } from "react-toastify";
import Cart from "@/components/cart/Cart";

export default function Page() {
  // external
  const dispatch = useDispatch();
  const auth = useSelector((store: any) => store.auth);
  const cart = useSelector((store: any) => store.cart);
  // internal
  const router = useRouter();
  const [total, setTotal]: any = useState(0);

  const updateLatestProducts = async (products: any) => {
    // console.log("updateLatestProducts");
    let latestProducts: any = [];
    for (const product of products) {
      try {
        const response = await getData(`products/${product._id}`);
        const latestProduct = response.data.product;
        if (!latestProduct) return toast.error("No product");

        // in stock
        if (latestProduct.stock)
          latestProducts.push({ ...latestProduct, options: product.options });
        // out stock
        else toast.error(`${latestProduct.name} product is out stock.`);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    // 서버로부터 최신화된 데이터를 클라이언트 리덕스스토어에 저장한다.
    // console.log({ latestProducts });
    dispatch(reloadCart({ products: latestProducts }));
  };

  // const handleOrder = (e: any) => {
  //   e.preventDefault();
  //   if (!auth.accessToken) {
  //     toast.error("You have to log in");
  //     return router.push("/auth/signin");
  //   }
  //   // const { address, mobile } = data;
  //   // const payload = {
  //   //   address,
  //   //   mobile,
  //   //   cart,
  //   //   total,
  //   // };
  //   // dispatch(addOrder(payload));
  //   router.push("/order");
  // };

  // get and set latest products from local storage
  useEffect(() => {
    const serializedCart: any = localStorage.getItem("cart");
    if (!serializedCart) return;
    const parsedCart = JSON.parse(serializedCart);
    if (!parsedCart.products?.length) return console.log("8382912");
    // console.log({ parsedCart });
    // 캐싱된 카트 프러덕츠를 통해서 최신화된 데이터로 갱신한다.
    if (!parsedCart.products?.length) return;
    updateLatestProducts(parsedCart.products);
  }, []);

  // set the tatal
  useEffect(() => {
    if (cart.products?.length)
      setTotal(
        cart.products.reduce((a: any, v: any) => {
          const optionsTotal = v.options.reduce((a: any, v: any) => a + v.price * v.quantity, 0);
          return a + optionsTotal;
        }, 0)
      );
  }, [cart]);

  if (!cart.products?.length) {
    return (
      <Main>
        <section>
          <div className="cart">
            <h1>No items</h1>
          </div>
        </section>
      </Main>
    );
  }
  return (
    <Main>
      <section>
        <div className="cart">
          <h1>Shopping Cart</h1>
          <ul className="cart-list">
            {cart.products.map((product: any, index: number) => (
              <Cart key={index} product={product} />
            ))}
          </ul>
          {/* <div className="payment">
            <button onClick={handleOrder}>Order</button>
          </div> */}
          <h3>Total (총합) : ${total}</h3>
        </div>
      </section>
    </Main>
  );
}

const Main = styled.main`
  > section {
    flex-direction: column;
    justify-content: flex-start;
    gap: 3rem;
    .cart {
      padding: 1rem;
      border: 2px solid green;
      > * {
        margin: 1rem 0;
      }
      > .cart-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      > h3 {
        height: 3rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border: 2px solid red;
        border-radius: 5px;
        padding: 1rem;
      }
    }
  }
`;

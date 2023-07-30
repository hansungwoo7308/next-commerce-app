import Header from "@/components/layout/Header";
import { useRouter } from "next/router";
export default function Layout({ children }: any) {
  const router = useRouter();
  // console.log({ router });
  return (
    <>
      {/* {router.pathname === "/auth/signin" ? null : <Header />} */}
      <Header />
      {children}
    </>
  );
}

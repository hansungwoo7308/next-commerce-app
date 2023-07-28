import Header from "@/components/layout/Header";
export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

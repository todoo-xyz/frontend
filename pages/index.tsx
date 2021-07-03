import Logo from "../components/layout/Logo";

export default function Home() {
  return (
    <>
      <div className="container mx-auto">
        <main className="flex flex-col min-h-screen justify-center h-full items-center">
          <Logo />
          <h1 className="text-center text-4xl lg:text-9xl mt-14">Coming soon</h1>
        </main>
      </div>
    </>
  )
}

import Header from "./header";

export default function Page({ children }) {
  return (
    <div className="w-screen">
      <div className="flex-col justify-center">
        <Header />
        {children}
      </div>
      <footer className="flex justify-center items-center border-t border-gray-500 w-screen">
        <span>© Capital Region Covid Project</span>
      </footer>
    </div>
  );
}

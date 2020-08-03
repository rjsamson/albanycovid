import Header from "./header";

export default function Page({ children }) {
  return (
    <div className="flex-col justify-center">
      <Header />
      {children}
      <footer>
        <span>© Capital Region Covid Project</span>
      </footer>
    </div>
  );
}

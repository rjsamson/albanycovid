import Header from "./header";

export default function Page({ children }) {
  return (
    <div>
      <Header />
      {children}
      <footer>
        <span>© Capital Region Covid Project</span>
      </footer>
    </div>
  );
}

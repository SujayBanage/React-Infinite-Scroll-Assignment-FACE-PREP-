import { useState, useRef, useCallback } from "react";
import useGetUsers from "./hooks/useGetUsers.hook";
import { useGetUsersReturnType } from "./hooks/useGetUsers.hook";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import User from "./components/User";
import "./App.css";
import Skeleton from "./components/Skeleton";

function App() {
  const [n, setN] = useState<number>(20);
  const { users, loading, error, hasMore }: useGetUsersReturnType = useGetUsers(
    { n }
  );

  const [loginToken, setLoginToken] = useState<string | null>(
    localStorage.getItem("login_token")
  );
  const navigate = useNavigate();

  // * intersection observer
  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      console.log("calling the function!");
      if (!node) return;
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setTimeout(() => {
            setN(n + 20);
          }, 1000);
        }
      });
      observer.current.observe(node);
    },
    [loading]
  );

  return (
    <main className="app__container">
      <nav className="app__navigation">
        {loginToken && (
          <button
            className="logout__button"
            onClick={() => {
              localStorage.removeItem("login_token");
              navigate("/");
            }}
          >
            <span>Logout</span>
            <FiLogOut size={15} color="white" />
          </button>
        )}
      </nav>
      <section className="users__list">
        {users.map((user, index) => {
          if (users.length - 1 === index) {
            return <User ref={lastElementRef} key={user.email} user={user} />;
          } else {
            return <User key={user.email} user={user} />;
          }
        })}
        {loading &&
          Array(10)
            .fill(0)
            .map(() => {
              return <Skeleton />;
            })}
      </section>
    </main>
  );
}

export default App;

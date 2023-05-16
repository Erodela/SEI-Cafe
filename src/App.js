import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./utilities/users-service";
//pages
import NewOrderPage from "./pages/NewOrderPage/NewOrderPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import OrderHistory from "./pages/OrderHistoryPage/OrderHistoryPage";
//components
import NavBar from "./components/NavBar";

function App() {
  // async function testCall() {
  //   const res = await fetch("/test"); functions that tests our connection
  //   const data = await res.json();
  //   console.log(data);
  // }

  // useEffect(() => {
  //   testCall();
  // }, []);
  const [user, setUser] = useState(getUser()); //hook

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} />
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;

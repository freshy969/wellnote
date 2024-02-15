import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { MantineProvider, Container } from "@mantine/core";
import Home from "./page/Home";
import Signup from "./page/Signup";
import Login from "./page/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase/config";
import { Header } from "./components/Header/Header";
import { useBearStore } from "./utils/state";

export default function App() {
  const user = useBearStore((state) => state.user)
  const setUser = useBearStore((state) => state.setUser)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <MantineProvider>
      <Header user={user} />
      <Container size="lg">
        <Router>
          <div>
            <section>
              <Routes>
                {" "}
                <Route path="/" element={<Home user={user} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </section>
          </div>
        </Router>
      </Container>
    </MantineProvider>
  );
}

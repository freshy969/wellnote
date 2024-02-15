import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { MantineProvider, Container } from "@mantine/core";
import Home from "./page/Home";
import Signup from "./page/Signup";
import Login from "./page/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase/config";
import { Header } from "./components/Header/Header";
import { useBearStore } from "./utils/state";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

export default function App() {
  const user = useBearStore((state: any) => state.user);
  const setUser = useBearStore((state: any) => state.setUser);

  useEffect(() => {

    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        throw Error("Please provide your email for confirmation")
      }
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
        })
        .catch(() => {});
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    
  }, [auth]);

  return (
    <MantineProvider>
      <Router>
        <Header user={user} />
        <Container size="lg">
          <Routes>
            {" "}
            <Route path="/" element={<Home user={user} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </Router>
    </MantineProvider>
  );
}

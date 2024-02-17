import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { MantineProvider, Container, Drawer } from "@mantine/core";
import Home from "./page/Home";
import Login from "./page/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase/config";
import { Header } from "./components/Header/Header";
import { useBearStore } from "./utils/state";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { Hero } from "./components/Hero/Hero";

import {Helmet} from "react-helmet";

export default function App() {
  const user = useBearStore((state: any) => state.user);
  const setUser = useBearStore((state: any) => state.setUser);
  const drawerOpen = useBearStore((state: any) => state.drawerOpen);
  const drawerTitle = useBearStore((state: any) => state.drawerTitle);
  const drawerContent = useBearStore((state: any) => state.drawerContent);
  const closeDrawer = useBearStore((state: any) => state.closeDrawer);



  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        throw Error("Please provide your email for confirmation");
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
    <>
    <Helmet>
        <title>Dolph - Passwords & Notes</title>
    </Helmet>
    <MantineProvider>
    <Drawer
        opened={drawerOpen}
        onClose={closeDrawer}
        title={drawerTitle}
        position={"right"}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        {drawerContent}
      </Drawer>
      <Router>
        <Header user={user} />
        <Container size="lg">
          <Routes>
            {" "}
            {user ? (
              <Route path="/" element={<Home user={user} />} />
            ) : (
              <Route path="/" element={<Hero />} />
            )}
            <Route path="/join" element={<Login />} />
          </Routes>
        </Container>
      </Router>
    </MantineProvider>
    </>
  );
}

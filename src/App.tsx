import "@mantine/core/styles.css";
import { MantineProvider, Container, Drawer, Modal } from "@mantine/core";
import Home from "./page/Home";
import Login from "./page/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// import { useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./utils/firebase/config";
import { Header } from "./components/Header/Header";
import { useBearStore } from "./utils/state";
// import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import "./App.css";

import { Helmet } from "react-helmet";

export default function App() {
  
  const drawerOpen = useBearStore((state: any) => state.drawerOpen);
  const drawerTitle = useBearStore((state: any) => state.drawerTitle);
  const drawerContent = useBearStore((state: any) => state.drawerContent);
  const closeDrawer = useBearStore((state: any) => state.closeDrawer);
  const drawerSize = useBearStore((state: any) => state.drawerSize);

  const modalOpen = useBearStore((state: any) => state.modalOpen);
  const modalTitle = useBearStore((state: any) => state.modalTitle);
  const modalContent = useBearStore((state: any) => state.modalContent);
  const closeModal = useBearStore((state: any) => state.closeModal);
  const modalSize = useBearStore((state: any) => state.modalSize);

  // useEffect(() => {
  //   if (isSignInWithEmailLink(auth, window.location.href)) {
  //     let email = window.localStorage.getItem("emailForSignIn");
  //     if (!email) {
  //       throw Error("Please provide your email for confirmation");
  //     }
  //     signInWithEmailLink(auth, email, window.location.href)
  //       .then(() => {
  //         window.localStorage.removeItem("emailForSignIn");
  //       })
  //       .catch(() => {});
  //   }

  //   // Check if user data is already in localStorage
  //   const storedUserData = window.localStorage.getItem("userData");
  //   if (storedUserData) {
  //     const user = JSON.parse(storedUserData);
  //     setUser(user);
  //   } else {
  //     // If user data is not in localStorage, fetch it
  //     const unsubscribe = onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         // Set user data in state
  //         setUser(user);

  //         // Save user data in localStorage
  //         window.localStorage.setItem("userData", JSON.stringify(user));
  //       }
  //     });

  //     // Cleanup the subscription when component unmounts
  //     return () => unsubscribe();
  //   }
  // }, [auth]);
  return (
    <>
      <Helmet>
        <title>Wellnote</title>
      </Helmet>
      <MantineProvider>
        <Modal
          opened={modalOpen}
          size={modalSize}
          onClose={closeModal}
          title={modalTitle}
          centered
        >
          {modalContent}
        </Modal>

        <Drawer
          opened={drawerOpen}
          onClose={closeDrawer}
          title={drawerTitle}
          size={drawerSize}
          position={"right"}
          transitionProps={{
            transition: "slide-left",
            duration: 300,
            exitDuration: 300
          }}
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        >
          {drawerContent}
        </Drawer>
        <Router>
          <Header />
          <Container size="lg">
            <Routes>
              {" "}
              <Route path="/" element={<Home />} />
              <Route path="/join" element={<Login />} />
            </Routes>
          </Container>
        </Router>
        {/* <FooterLinks /> */}
      </MantineProvider>
    </>
  );
}

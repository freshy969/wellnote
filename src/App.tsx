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

export default function App() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider>
          <Header user={user} />
          <Container size="lg">
            <Router>
              <div>
                <section>
                  <Routes>
                    {" "}
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </section>
              </div>
            </Router>
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}

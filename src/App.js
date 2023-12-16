import LandingPage from "./components/landingPage/landingPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPageComponent from "./components/Authorization/Authorization";
import WebCodeCompiler from "./components/codeCompilers/webCodeCompiler/webCodeCompiler";
import OopsBasics from "./components/learnings/oops/basics";
import JavaCodeCompiler from "./components/codeCompilers/javaCodeCompiler/javaCodeCompiler";
import KnowledgeTest from "./components/knowledgeTest/pageLayout/knowledgeTest";
import { EmailProvider } from "./context/UserContext";
import Register from "./components/Authorization/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import RegisterBiometric from "./components/Discarded/RegisterBiometric";
import Login from "./components/Authorization/Login/Login";
import FlexboxGame from "./components/game/FlexboxGame";

function App() {
  return (
    <>
      <BrowserRouter>
        <EmailProvider>
          <Routes>
            {/* HomePage */}
            <Route path="/" element={<LandingPage />} />
            {/* Authenciation */}
            <Route
              path="/login"
              element={
                <LoginPageComponent title={"Login"} bottomTitle={"Signup"} />
              }
            />

            <Route
              path="/signup"
              element={
                <LoginPageComponent title={"Signup"} bottomTitle={"Login"} />
              }
            />

            {/* Authrization */}

            <Route path="/login-user" element={<Login />} />

            <Route path="/register-user" element={<Register />} />
            {/* Dashboard */}
            <Route path="/dashboard-user" element={<Dashboard />} />
            {/* Features */}
            <Route path="/web-compiler" element={<WebCodeCompiler />} />
            <Route path="/java-compiler" element={<JavaCodeCompiler />} />
            <Route path="/learning-options" element={<KnowledgeTest />} />
            <Route path="/learn-oops-in-java" element={<OopsBasics />} />
            <Route path="/game" element={<FlexboxGame />} />
          </Routes>
        </EmailProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

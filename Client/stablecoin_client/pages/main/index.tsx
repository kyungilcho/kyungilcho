import { Logo } from "../../components/MainPageComponents";
import { Button2 } from "../../components/SimpleComponents";
import router from "next/router";

const Main = () => {
  return (
    <section className="main-container">
      <Logo />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button2
          text="Login"
          onClick={() => {
            router.push("/");
          }}
          className="main-btn"
        />
        <Button2
          text="Register"
          onClick={() => {
            router.push("/");
          }}
          className="main-btn"
        />
      </div>
    </section>
  );
};

export default Main;

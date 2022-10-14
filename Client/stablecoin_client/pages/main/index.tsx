import { Logo } from "../../components/MainPageComponents";
import { Button2 } from "../../components/SimpleComponents";
import router from "next/router";
import { Modal } from "../../components/Modal";
import { useState } from "react";
import { Input } from "../../components/SimpleComponents";
import Eth from "../../utils/ethereum";
import { useGlobalDispatch } from "../../context";

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [privateKey, setPrivateKey] = useState("");

  const dispatch = useGlobalDispatch();

  return (
    <section className="main-container">
      <Logo />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button2
          text="Login"
          onClick={() => {
            setShowModal(true);
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
      {showModal ? (
        <Modal
          show={showModal}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <div>
            <h2>SIGN IN</h2>
            <form>
              <Input onChange={setPrivateKey} placeholder="Private Key" />
              <Button2
                text="Sign In"
                onClick={() => {
                  if(Eth.isValidPrivateKey(privateKey)) {
                    setShowModal(false);
                    dispatch({
                      type: "SET_ADDRESS",
                      address: Eth.getAddressFromPrivateKey(privateKey) || "",
                    });
                    dispatch({
                      type: "ADD_ACCOUNT_LIST",
                      accountList: [{address: Eth.getAddressFromPrivateKey(privateKey), privateKey: privateKey}] || "",
                    });
                    router.push("/");
                  }else{
                    alert("Wrong Private Key");
                  }
                }}
              />
            </form>
          </div>
        </Modal>
      ) : null
      }
    </section>
  );
};

export default Main;
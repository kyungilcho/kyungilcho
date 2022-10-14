import { Logo } from "../../components/MainPageComponents";
import { Button2, Input } from "../../components/SimpleComponents";
import router from "next/router";
import { Modal } from "../../components/Modal";
import { useState } from "react";
import Eth from "../../utils/ethereum";
import { useGlobalDispatch } from "../../context";

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [privateKey, setPrivateKey] = useState("");

  const dispatch = useGlobalDispatch();

  const actionCreator = () => {
    return [
              dispatch({
                type: "SET_ADDRESS",
                address: Eth.getAddressFromPrivateKey(privateKey) as string,
              }),
              dispatch({
                type: "SET_PRIVATEKEY",
                privateKey: privateKey,
              }),
              dispatch({
                type: "ADD_ACCOUNT_LIST",
                accountList: {[Eth.getAddressFromPrivateKey(privateKey) as string]: {address: Eth.getAddressFromPrivateKey(privateKey), privateKey: privateKey}} || {},
              }),
    ]
  }

  const SignInModal = () => {
    return (
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

                actionCreator();

                router.push("/");
              }else{
                alert("Wrong Private Key");
              }
            }}
          />
        </form>
      </div>
    </Modal>
    )
  }

  const SignUpModal = () => {
    return (
      <Modal
      show={showSignUpModal}
      onClose={() => {
        setShowSignUpModal(false);
      }}
    >
      <div>
        <h2>SIGN UP</h2>
        <br />
        {privateKey ? (<h4>Private Key: {privateKey}</h4>) : (<></>)}
        <form>
          <Button2
            text="Create Key!"
            onClick={() => {
              setPrivateKey(Eth.generatePrivateKey() as string);
            }}
          />
          <Button2
            text="Let's go!"
            onClick={() => {
              setShowSignUpModal(false);
              actionCreator();
              router.push("/");
            }}
          />
        </form>
      </div>
    </Modal>
    )
  }
   
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
            setShowSignUpModal(true);
          }}
          className="main-btn"
        />
      </div>
      {showModal ? (<SignInModal />) : null}
      {showSignUpModal ? (<SignUpModal />) : null}
    </section>
  );
};

export default Main;
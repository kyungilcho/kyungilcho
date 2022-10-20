import {Box, Dropdown, Button2} from "../../components/SimpleComponents";
import { useBalance } from "../../utils/hooks/EthereumHooks";
import {memo} from "react";
 
 const UserInfoBox = (props: {address:string, dispatch: any, accountList: object}) => {
    const [EthBalance, dispatch1] = useBalance(props.address, "ether");
    const [tokenBalance, dispatchToken] = useBalance(props.address, "token");

    const addressChange = (value: any) => {
      return [
        props.dispatch({type: "SET_PRIVATEKEY", privateKey: props.accountList[value].privateKey || ""}),
        props.dispatch({ type: "SET_ADDRESS", address: value }),
      ];
    };

    return (
      <Box>
        <div className="box__address">
          <h3>Address: {props.address}</h3>
          <Dropdown options={props.accountList} onChange1={addressChange} />
        </div>
        <div className="box__info">
          <h2>{`ether: ${EthBalance ? EthBalance.toFixed(5) : 0}`}</h2>
          <h2>{`token: ${tokenBalance ? tokenBalance : 0}`}</h2>
          <Button2
            text="token balance check"
            value="good"
            onClick={() => {
              console.log();
            }}
          />
        </div>
      </Box>
    );
  };

export default memo(UserInfoBox);
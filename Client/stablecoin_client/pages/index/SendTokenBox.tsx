import { Box, Button2, Container, Input} from "../../components/SimpleComponents"; 
import Eth from "../../utils/ethereum";
import React from 'react'

  const SendTokenBox = (props: {senderAddress:string, privateKey: string, dispatch: any}) => {
    const [toAddress, setToAddress] = React.useState("");
    const [amount, setAmount] = React.useState(0);

    const onClickHandler = async (e: React.MouseEvent<HTMLElement>) => {
        console.log('====================================');
        console.log('event', e);
        console.log('====================================');
      await Eth.sendToken(
        props.senderAddress,
        toAddress,
        amount,
        props.privateKey,
        props.dispatch
      );
    };

    return (
      <Box title="Send Token">
        <Container flexDirection="row">
          <Container flexDirection="column">
            <Input
              label="to address"
              placeholder="to address"
              onChange={setToAddress}
            />
            <Input
              label="amount"
              placeholder="0.1001 cho"
              onChange={setAmount}
            />
          </Container>
          <Button2 text="Send" onClick={(e) => {
            onClickHandler(e);
            }} value={toAddress} />
        </Container>
      </Box>
    );
  };

  export default SendTokenBox;
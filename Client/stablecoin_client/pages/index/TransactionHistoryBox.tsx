import { Box, ScrollContainer, Container, Card } from "../../components/SimpleComponents"; 
import Eth from "../../utils/ethereum";
import React, { memo, useEffect } from "react";

const TransactionHistoryBox = (props: {address: string}) => {
    const [transactionHistory, setTransactionHistory] = React.useState([
      { returnValues: { from: "", to: "", value: 0 } },
    ]);
    
    console.log("address", props.address)
    useEffect(() => {
      const interval = setInterval(async () => {
        const transactionHistory = await Eth.getTransactionHistory(
          props.address
        );
        if(transactionHistory) setTransactionHistory(transactionHistory)
      }, 10000);
      return () => clearInterval(interval);
    }, [props.address]);

    const createCard = (transaction: any, index: number) => {
      if(transaction.returnValues.from === props.address) {
        return (
          <Container key={index} className="card">
            <Card type="send" txValue={transaction.returnValues} />
          </Container>
        )
      } else if (transaction.returnValues.to === props.address) {
        return (
          <Container key={index} className="card">
            <Card type="receive" txValue={transaction.returnValues} />
          </Container>       
          )
      }
    }

    return (
      <Box title="Transaction History" className="transaction-history">
        <ScrollContainer flexDirection="column">
          {transactionHistory &&
            transactionHistory.map((transaction, index) => {
              return createCard(transaction, index);
            })}
        </ScrollContainer>
      </Box>
    );

};

export default memo(TransactionHistoryBox);
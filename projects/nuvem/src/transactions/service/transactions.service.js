import axios from "axios";

const validTransaction = (transaction) => {
  return transaction.value;
};

const createPayable = (transaction) => {
  const total = transaction.value;
  const month = new Date() + 30;
  console.log(month);
  if (transaction.method === "credit_card") {
    const discount = (transaction.value * 4) / 100;
    return {
      status: "waiting_funds",
      create_date: new Date() + 30,
      total: total,
      discount: discount,
      subtotal: total - discount,
    };
  } else {
    const discount = (transaction.value * 2) / 100;
    return {
      status: "paid",
      create_date: new Date(),
      total: total,
      discount: discount,
      subtotal: total - discount,
    };
  }
};

const saveTransaction = async (transaction) => {
  const response = await axios.post(
    "http://0.0.0.0:8080/transactions",
    transaction,
  );

  if (response.status === 201) {
    console.log("Transaction created: ");
    return response;
  } else {
    console.error("There was an error recording the transaction");
    return null;
  }
};

const savePayable = async (payable) => {
  const response = await axios.post("http://0.0.0.0:8080/payables", payable);

  if (response.status === 201) {
    console.log("Payable created ");
    return response;
  } else {
    console.error("There was an error recording the payable");
    return null;
  }
};

const deleteTransaction = async (transactionId) => {
  const response = await axios.delete(
    `http://0.0.0.0:8080/transactions/${transactionId}`,
  );

  if (response.status === 200) {
    console.log("Transaction removed: ");
    return response;
  } else {
    console.error("There was an error deleting the transaction");
    return null;
  }
};

const generateResponse = (transaction, payable) => {
  return { transaction, payable };
};

const createTransaction = async (transaction) => {
  if (validTransaction(transaction)) {
    const transactionResponse = await saveTransaction(transaction);
    if (transactionResponse) {
      const payable = createPayable(transaction);
      const payableResponse = await savePayable(payable);
      if (payableResponse) {
        console.log("Success!!");
        return generateResponse(transaction, payable);
      } else {
        console.error("Couldnt record payable.");
        const responseDelete = await deleteTransaction();
        return {
          error_code: "PAYABLE_ERROR",
          message: "Couldnt complete payable recording. Rollbacked",
        };
      }
    } else {
      console.error("Couldnt create transaction. Aborting process");
      return {
        error_code: "TRANSACTION_ERROR",
        message: "Couldnt complete transaction.",
      };
    }
  } else {
    console.error("Invalid transaction. Aborting process");
    return {
      error_code: "VALIDATION_ERROR",
      message: "The received validation wasnt correct",
    };
  }
};

export default { createTransaction };

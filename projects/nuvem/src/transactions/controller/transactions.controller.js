import service from "../service/transactions.service.js";

const createTransaction = async (req, res) => {
  try {
    const transaction = req.body;
    console.log("Transaction received: ", transaction);
    const result = await service.createTransaction(transaction);
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.log("There was an unexpected error", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default { createTransaction };

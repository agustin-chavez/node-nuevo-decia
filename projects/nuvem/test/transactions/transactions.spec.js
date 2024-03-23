import axios from "axios";

test("Transaction should succeed", async () => {
  const data = await axios.get("http://localhost:3000/endpoint");
  expect(data).toBe("something");
});

test("Transactions should fail", async () => {
  const data = await axios.get("http://localhost:3000/endpoint");
  expect(data).toBe("something");
});

test("Some unit test", async () => {
  try {
  } catch (error) {
    expect(error).toMatch("error");
  }
});

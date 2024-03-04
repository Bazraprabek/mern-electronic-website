const { khaltiKPG } = require("../services/khalti");

const khalti = async (req, res) => {
  try {
    const response = await khaltiKPG();
    const result = await response.text();
    const resultObject = JSON.parse(result);

    if (resultObject.status_code === 401) {
      throw new Error("Unauthorized");
    }
    res.send(resultObject.payment_url);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { khalti };

const khaltiKPG = async () => {
  const data = JSON.stringify({
    return_url: "http://localhost:5173/",
    website_url: "http://localhost:5173/",
    amount: 1300,
    purchase_order_id: "test12",
    purchase_order_name: "test",
    customer_info: {
      name: "Prabek Bir Bajracharya",
      email: "bazprabek@gmail.com",
      phone: "9861289596",
    },
    amount_breakdown: [
      {
        label: "Mark Price",
        amount: 1000,
      },
      {
        label: "VAT",
        amount: 300,
      },
    ],
    product_details: [
      {
        identity: "1234567890",
        name: "Khalti logo",
        total_price: 1300,
        quantity: 1,
        unit_price: 1300,
      },
    ],
  });
  var request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Key ${process.env.KHALTI_KEY}`,
    },
    body: data,
  };
  const response = await fetch(
    "https://khalti.com/api/v2/epayment/initiate/",
    request
  );

  return response;
};

module.exports = { khaltiKPG };

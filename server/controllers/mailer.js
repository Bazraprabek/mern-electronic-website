const nodemailer = require("nodemailer");

const sendMail = async (username, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: `Welcome, ${username}! Explore BAZRA SHOP with Excitement 🎉`,
      text: `Hello ${username},\n\nWelcome to BAZRA SHOP! We are thrilled to have you on board. Start exploring our amazing products now.`,
      html: `<b>Hello ${username},</b><br><br>
             <p>Welcome to <strong>BAZRA SHOP</strong>! We are thrilled to have you on board.</p>
             <p>Start exploring our amazing products now and enjoy a delightful shopping experience.</p>
             <p><em>Happy Shopping!</em></p>`,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendMail };

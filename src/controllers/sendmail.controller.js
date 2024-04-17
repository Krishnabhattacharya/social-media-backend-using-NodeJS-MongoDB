import nodemailer from "nodemailer";

export const sendMail = async (to, message, subject) => {
    try {
        let testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            //service: 'gmail',
            host: 'smtp.gmail.com',
            port: "587",
            secure: false,
            requireTLS: true,
            auth: {

            }
        });
        let info = await transporter.sendMail({
            from: 'babuvochay112@gmail.com', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
            html: `<b>${message}</b>`, // html body
        });
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        throw new Error(error.message);
    }
}

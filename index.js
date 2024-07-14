const express = require("express");
const nodemailer = require("nodemailer")
const app = express();



app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/emailform.html")
})

let transporter = nodemailer.createTransport({
    host:'localhost',
    port:1025,
    secure: false, // true for 465, false for other ports
});

app.use(express.json())

app.post("/submit-complaint",(req,res,next)=>{
    const { name, email, subject, details } = req.body;

    const ticketId = 123456


    const mailOptions = {
        to:email,
        from:"do-not-reply@support.com",
        subject:`[Ticket ID: #${ticketId}] ${subject}`,
        text:`
Dear ${name},

Thank you for bringing this matter to our attention. We have reviewed your concerns thoroughly regarding ${subject}. We apologize for any inconvenience caused.

We strive to ensure Disha gruh udyog delivers exceptional service, and your feedback helps us improve.

We will get back to you as soon as possible with correct resolution on this matter.

Please feel free to contact us if you have any further questions or need additional assistance regarding this matter.

Thank you for your understanding and patience.

Best regards,

Paras More,
Disha Gruh Udyog
dishagruhudyog@supportmail.com

        `,
    }

    transporter.sendMail(mailOptions,(err,info)=>{

        if(err){
            console.log("error fromp pmomo",err);
        }else{
            console.log(info);
        }

    })

    res.status(200).send(`Dear ${name} Thank you for bringing this matter to our attention. We have reviewed your concerns thoroughly regarding ${subject}. We apologize for any inconvenience caused. Further we request you to please provide some time to resolve this matter we will update you on this soon `)
})  

app.listen(8080,()=>{
    console.log("server is up at port no 8080");
})
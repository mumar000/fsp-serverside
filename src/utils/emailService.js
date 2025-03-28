const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_Company,
        pass: process.env.GMAIL_Company_PASSWORD
    }
});


//html for mails 

const WelcomeMailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Visa Request Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            background: #ffffff;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #0056b3;
            text-align: center;
        }
        p {
            color: #333;
            font-size: 16px;
            line-height: 1.5;
        }
        .cta-button {
            display: block;
            width: 100%;
            max-width: 200px;
            background: #0056b3;
            color: #ffffff;
            text-align: center;
            padding: 12px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            margin: 20px auto;
        }
        .cta-button:hover {
            background: #003f7d;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>
<body>

    <div class="container">
        <h2>Welcome to Our Visa Request System</h2>
        <p>Dear Applicant,</p>
        <p>Thank you for choosing our visa request system. We are thrilled to assist you in securing your visa.</p>
        <p>Please fill out and submit your visa application form, and our team will review it promptly.</p>
    </div>

</body>
</html>

`
const sendNewRequestHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Visa Request Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            background: #ffffff;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #d9534f;
            text-align: center;
        }
        p {
            color: #333;
            font-size: 16px;
            line-height: 1.5;
        }
        .details {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 10px 0;
        }
        .details ul {
            list-style: none;
            padding: 0;
        }
        .details li {
            margin: 8px 0;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>
<body>

    <div class="container">
        <h2>New Visa Request Received</h2>
        <p>A new visa request has been submitted with the following details:</p>
        <div class="details">
            <ul>
                <li><strong>Email:</strong> ${requestData.email_address}</li>
                <li><strong>Phone:</strong> ${requestData.phone_number}</li>
                <li><strong>Form Type:</strong> ${requestData.form_type}</li>
            </ul>
        </div>
        <p>Please review the request and take the necessary action.</p>
    </div>

</body>
</html>

`

const statusUpdateEmailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Visa Request Status Update</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            background: #ffffff;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #0056b3;
            text-align: center;
        }
        p {
            color: #333;
            font-size: 16px;
            line-height: 1.5;
        }
        .status-box {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: #d9534f;
            margin: 15px 0;
        }
        .cta-button {
            display: block;
            width: 100%;
            max-width: 200px;
            background: #0056b3;
            color: #ffffff;
            text-align: center;
            padding: 12px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            margin: 20px auto;
        }
        .cta-button:hover {
            background: #003f7d;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>
<body>

    <div class="container">
        <h2>Visa Request Status Update</h2>
        <p>Your visa request status has been updated to:</p>
        <div class="status-box">${status}</div>
        <p>Please log in to your account to view more details.</p>
    </div>

</body>
</html>

`
const formSubmitConfirmationHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Form Submission Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            background: #ffffff;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #28a745;
            text-align: center;
        }
        p {
            color: #333;
            font-size: 16px;
            line-height: 1.5;
        }
        .highlight {
            background: #f9f9f9;
            padding: 10px;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
            font-size: 18px;
            color: #007bff;
            margin: 15px 0;
        }
        .cta-button {
            display: block;
            width: 100%;
            max-width: 200px;
            background: #0056b3;
            color: #ffffff;
            text-align: center;
            padding: 12px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            margin: 20px auto;
        }
        .cta-button:hover {
            background: #003f7d;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>
<body>

    <div class="container">
        <h2>Your ${form_type} Form Has Been Submitted</h2>
        <p>Thank you for submitting your <span class="highlight">${form_type}</span> form.</p>
        <p>We will review your request and notify you once we have made a decision.</p>
    </div>

</body>
</html>

`
// Send email to admin for new request
const sendNewRequestEmail = async (adminEmail, requestData) => {
    const mailOptions = {
        from: process.env.GMAIL_Company,
        to: adminEmail,
        subject: 'New Visa Request Received',
        html:sendNewRequestEmail
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Admin notification email sent successfully');
    } catch (error) {
        console.error('Error sending admin notification email:', error);
    }
};

// Send status update email to requester
const sendStatusUpdateEmail = async (requesterEmail, status) => {
    const mailOptions = {
        from: process.env.GMAIL_Company,
        to: requesterEmail,
        subject: 'Visa Request Status Update',
        html: statusUpdateEmailHtml
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Status update email sent successfully');
    } catch (error) {
        console.error('Error sending status update email:', error);
    }
};


const sendFormSubmissionConfirmationMail = async (requesterEmail,form_type) => {
      const mailOptions = {
        from : process.env.GMAIL_Company,
        to: requesterEmail , 
        subject: `Your ${form_type} Form Has Been Submitted`,
        html: formSubmitConfirmationHtml
      }
      try {
       await transporter.sendMail(mailOptions);
       console.log('Form submission confirmation email sent successfully');
      } catch (error) {
        console.log( ' error while sending the confirmation email ',error);
      }
}


const sendWelcomeEmail = async (requesterEmail) =>{
    const mailoptions  = {
        from : process.env.GMAIL_Company,
        to : requesterEmail,
        subject : 'Welcome to our Visa Request System',
        html :WelcomeMailHtml
    }

    try {
       transporter.sendMail(mailoptions);
       console.log('Welcome email sent successfully');
    } catch (error) {
        console.error('error while sending welcome mail' ,  error);
    }
}

module.exports = {
    sendNewRequestEmail,
    sendStatusUpdateEmail,
    sendFormSubmissionConfirmationMail,
    sendWelcomeEmail
}; 
import Users from './../../../models/userSchema';
import { NextResponse } from 'next/server';
import { startDb } from './../../lib/db';
import { transporter, mailOptions } from './../../config/nodemailer';
import crypto from 'crypto';

await startDb();

const DOMAIN = process.env.DOMAIN;

const sendMail = async (id, to, password, userName) => {
  await transporter.sendMail({
    ...mailOptions,
    to,
    subject: 'Business Registration',
    text: `reset url:${DOMAIN}/users/registrationForm/${id}`,
    html: `
          <div>
          <h1>Register your Business</h1>
          <p>
          Click on the link below to Register your Business
          </p>
          <a href='${DOMAIN}/users/registrationForm/${id}'>${DOMAIN}/users/registrationForm/${id}</a>
          <p>Email: ${to}</p>
          <p>UserName: ${userName}</p>
          <p>Password: ${password}</p>
          <p>Please use the above Url to Register your Business.</p>
          </div>`,
  });
};

export async function POST(req) {
  try {
    const { email, userName } = await req.json();
    // console.log({ email, userName });
    if (!email || !userName) throw new Error('Please Provide Credentials');
    const password = crypto.randomBytes(3).toString('hex');
    const newUser = await Users.create({ email, userName, password });
    if (!newUser)
      throw new Error('Cannot create Account. Please Try Again Later');
    console.log(newUser);
    await sendMail(newUser._id, email, password, userName);
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    if (error.message.includes('duplicate key'))
      return NextResponse.json({
        status: 'failure',
        message: 'Account Already Registered.',
      });
    return NextResponse.json({ status: 'failure', message: error.message });
  }
}

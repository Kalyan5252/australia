import Users from './../../../models/userSchema';
import { NextResponse } from 'next/server';
import { startDb } from './../../lib/db';
import { transporter, mailOptions } from './../../config/nodemailer';
import crypto from 'crypto';

await startDb();

const DOMAIN = process.env.DOMAIN;

// <a href='${DOMAIN}/users/registrationForm/${id}'>${DOMAIN}/users/registrationForm/${id}</a>

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
          Click on the link below to login and register your Business
          </p>
          <a href='${DOMAIN}/login'>${DOMAIN}/login</a>
          <p>Email: ${to}</p>
          <p>Please check your Credentials below to login and get your Business Details.</p>
          <p>UserName: <span style="font-weight: 800;">${userName}</span></p>
          <p>Password: <span style="font-weight: 800;">${password}</span></p>
          <p>Please use the above Url to Register your Business.</p>
          </div>`,
  });
};

export async function POST(req) {
  try {
    const { email, mobile, abn } = await req.json();
    // console.log({ email, userName });
    if (!email && !mobile && !abn)
      throw new Error('Please Provide Credentials');
    // console.log({ email, mobile, abn });
    const userName = email.split('@').slice(0, -1).join('');
    const password = crypto.randomBytes(3).toString('hex');
    const newUser = await Users.create({
      email,
      userName,
      password,
      abn,
      data: { abn },
    });
    if (!newUser)
      throw new Error('Cannot create Account. Please Try Again Later');
    // console.log(newUser);
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

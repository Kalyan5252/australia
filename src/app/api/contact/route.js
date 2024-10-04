import Users from './../../../models/userSchema';
import { NextResponse } from 'next/server';
import { transporter, mailOptions } from './../../config/nodemailer';
const EMAIL = process.env.NODEMAILER_EMAIL;

export async function POST(req) {
  try {
    const { userId, subject, body } = await req.json();
    const user = await Users.findById({ _id: userId });
    if (!user) {
      throw new Error('No Such User Found');
    }

    await transporter.sendMail({
      ...mailOptions,
      to: EMAIL,
      subject: subject !== '' ? subject : 'Message from Client',
      text: 'Message from Business Client',
      html: `
          <div>
          <p>From ${user.email}</p>
          <p>Business Name: ${user?.data?.businessName}</p>
          <p>Sub: ${subject}</p>
          <p>
          ${body}
          </p>
          </div>`,
    });
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

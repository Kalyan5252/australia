import { NextResponse } from 'next/server';
import startDb from '@/app/lib/db';
import User from '@/models/userSchema';
import r2 from '@/app/lib/r2';
import { transporter, mailOptions } from './../../config/nodemailer';
import crypto from 'crypto';

await startDb();
const DOMAIN = process.env.DOMAIN;

const sendMail = async (id, to, password, userName) => {
  await transporter.sendMail({
    ...mailOptions,
    to,
    subject: 'Business Registration Successful',
    text: `you have successfully registered your business`,
    html: `
          <div>
          <h1>Business Registration Successful</h1>
          <p>Thank you for registering! Your account has been successfully created with the email ${to}</p>
          <p>Please check your Credentials below to login and get your Business Details.</p>
          <p>UserName: <span style="font-weight: 800;">${userName}</span></p>
          <p>Password: <span style="font-weight: 800;">${password}</span></p>
          <p>
          Click on the link below to Register your Business
          </p>
          <a href='${DOMAIN}/login'>${DOMAIN}/login</a>
          <p>Welcome aboard!</p>
          </div>`,
  });
};

export async function GET() {
  try {
    const users = await User.find({ role: { $ne: 'admin' } }).sort({
      createdAt: -1,
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req) {
  try {
    const reqData = await req.formData();
    let extractedData = {};
    for (const [key, value] of reqData.entries()) {
      extractedData[key] = value;
    }
    const { data } = extractedData;

    const fields = JSON.parse(data);

    if (extractedData?.image) {
      const image = extractedData.image;
      const fileBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(fileBuffer, 'base64');
      const fileName = `${Date.now()}_${image.name}`;

      const uploadParams = {
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: image.type,
      };

      await r2.upload(uploadParams).promise();
      fields.businessLogo = fileName;
    }
    // const data = await req.json();
    const password = crypto.randomBytes(3).toString('hex');

    // console.log(data);
    const newUser = await User.create({
      data: fields,
      email: fields.email,
      userName: `${fields.firstName}_${fields.lastName}`,
      password: password,
    });
    await sendMail(newUser._id, newUser.email, password, newUser.userName);
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: 'failure', message: error.message },
      { status: 400 }
    );
  }
}

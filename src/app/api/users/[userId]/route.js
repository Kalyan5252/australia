import { NextResponse } from 'next/server';
import startDb from '@/app/lib/db';
import User from '@/models/userSchema';
import r2 from '@/app/lib/r2';

await startDb();

export async function GET(req, context) {
  const { userId } = context.params;
  try {
    const user = await User.findById(userId);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PATCH(req, { params }) {
  try {
    const { userId } = params;
    // const body = await req.json();
    // const userData = await User.findById(userId);
    const updateFields = {};

    // if (body.email) {
    //   updateFields['email'] = body.email;
    // }

    // if (body.firstName && body.lastName) {
    //   updateFields['userName'] = `${body.firstName}_${body.lastName}`;
    // } else if (body.lastName) {
    //   updateFields[
    //     'userName'
    //   ] = `${userData.data.firstName}_${body.lastName}`;
    // } else if (body.firstName) {
    //   updateFields[
    //     'userName'
    //   ] = `${body.firstName}_${userData.data.lastName}`;
    // }
    // for (const [key, value] of Object.entries(body)) {
    //   if (key) {
    //     updateFields[`data.${key}`] = value;
    //   }
    // }

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
    // console.log(data);
    // console.log(fields);
    const user = await User.updateOne(
      { _id: userId },
      { $set: { data: fields, email: fields.email } }
    );
    // return NextResponse.json({});
    return NextResponse.json({ status: 'success', user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 'failure', error: error.message });
  }
}

export async function POST(req, { params }) {
  try {
    const { userId } = params;
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
    // console.log(data);
    const newUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        data: fields,
        isRegistered: true,
        // email: fields.email,
        // userName: `${fields.firstName}_${fields.lastName}`,
      }
    );
    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

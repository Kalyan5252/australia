import { NextResponse } from 'next/server';
import startDb from '@/app/lib/db';
import User from '@/models/userSchema';
import r2 from '@/app/lib/r2';

await startDb();

export async function GET() {
  try {
    const users = await User.find().sort({ createdAt: -1 });
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
      console.log(image);
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
    const newUser = await User.create({
      data: fields,
      email: fields.email,
      userName: `${fields.firstName}_${fields.lastName}`,
    });
    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

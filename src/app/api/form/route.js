// import mongoose from 'mongoose';
import Form from '@/models/formSchema';
import { NextResponse } from 'next/server';
import startDb from '@/app/lib/db';

await startDb();
export async function GET() {
  try {
    const formData = await Form.find().select('-_id -__v');
    return NextResponse.json(formData);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newField = await Form.create(body);
    return NextResponse.json(newField);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

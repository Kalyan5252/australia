import mongoose, { Schema, model, models } from 'mongoose';

const FormSchema = new mongoose.Schema({
  label: String,
  type: String,
  options: [],
  file: String,
  value: { type: String, default: '' },
});

const Form = models?.Form || model('Form', FormSchema);

export default Form;

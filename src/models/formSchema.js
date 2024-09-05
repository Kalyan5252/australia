import mongoose, { Schema, model, models } from 'mongoose';

const FormSchema = new mongoose.Schema({
  label: String,
  type: {
    type: String,
    default: 'text',
  },
  options: [],
  file: String,
  value: { type: String, default: '' },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: String,
});

const Form = models?.Form || model('Form', FormSchema);

export default Form;

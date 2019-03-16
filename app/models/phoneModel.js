import mongoose, { model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const phonesSchema = new mongoose.Schema({
    NumberstoGenerate: {
        type: Number,
        required: true
    }, 
},
{
  timestamps: true
}
)

const Phone = mongoose.model('Phone', phonesSchema);

export default Phone;

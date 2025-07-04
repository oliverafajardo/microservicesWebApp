import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties that are required to create a new User
interface UserAttrs {
    email: string;
    password: string;
}

// An interface that describes the properties that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}


// an interface that describes the properties that a user document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;

}

//defining the user schema 
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
})

//middlewware - when pass is saved, hash the password
userSchema.pre('save', async function(done) {   
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});
//we do not use arrow function because we need to use the 'this' keyword, because we are using the mongoose model
//we use the 'this' keyword to get the password from the user document
//we use the 'this' keyword to set the password to the hashed password
//we use the 'this' keyword to call the done function

//added static method to the user schema
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

const user = User.build({
    email: 'test@test.com',
    password: 'password'
});



export { User };


import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
    name: string;
    email: string;
    role: 'super-admin' | 'admin' | 'school_admin' | 'teacher' | 'student' | 'parent';
    password: string;
    tenantId: string; // School ID
    matchPassword(password: string): Promise<boolean>;
    getSignedJwtToken(): string;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    role: {
        type: String,
        enum: ['super-admin', 'admin', 'school_admin', 'teacher', 'student', 'parent'],
        default: 'student',
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
    },
    tenantId: {
        type: String,
        required: [true, 'Please add a tenant ID'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});



// Encrypt password using bcrypt
UserSchema.pre('save', async function (this: IUser) {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function (this: IUser) {
    return jwt.sign(
        { id: this._id, name: this.name, role: this.role, tenantId: this.tenantId },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRE as any }
    );
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);

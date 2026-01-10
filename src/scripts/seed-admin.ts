import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import path from 'path';

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedAdmin = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin@cityschool.com' });

        if (adminExists) {
            console.log('Admin already exists. Updating role and name...');
            adminExists.role = 'super-admin';
            adminExists.name = 'Super Admin';
            await adminExists.save();
            console.log('Admin updated to super-admin with correct name.');
        } else {
            const admin = await User.create({
                name: 'Super Admin',
                email: 'admin@cityschool.com',
                password: 'adminpassword123', // Will be hashed by pre-save hook
                role: 'super-admin',
                tenantId: 'HQ-GLOBAL'
            });
            console.log('Super Admin created successfully!');
            console.log('Email: admin@cityschool.com');
            console.log('Password: adminpassword123');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();

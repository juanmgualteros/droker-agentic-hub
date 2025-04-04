import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    console.log('Login API called');
    const body = await request.json();
    const { email, password } = body;
    console.log(`Login attempt for email: ${email}`);

    // Check for super admin credentials - fixed credentials
    if (email === "juan@droker.co" && password === "4462") {
      console.log('Superadmin credentials matched');
      return NextResponse.json({
        success: true,
        user: {
          id: 'superadmin',
          email: 'juan@droker.co',
          name: 'Juan Gualteros',
          role: 'superadmin',
        },
      });
    } else if (email === "juan@droker.co") {
      console.log('Superadmin email matched but password incorrect');
      return NextResponse.json(
        { success: false, message: 'Invalid password for superadmin' },
        { status: 401 }
      );
    }

    // For regular admin users, check against the database
    console.log('Checking database for user');
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          organization: true,
        },
      });

      if (!user) {
        console.log('User not found in database');
        return NextResponse.json(
          { success: false, message: 'Invalid credentials' },
          { status: 401 }
        );
      }

      console.log('User found in database, checking password');
      // In a real implementation, you would hash passwords and compare them using bcrypt
      // For now, we'll use a simple check against a hardcoded password for demo purposes
      // const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
      const isPasswordValid = password === "admin123"; // Temporary simple check for all admin users

      if (!isPasswordValid) {
        console.log('Password invalid for database user');
        return NextResponse.json(
          { success: false, message: 'Invalid credentials' },
          { status: 401 }
        );
      }

      console.log('Authentication successful for database user');
      // Return user information without sensitive data
      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          organizationId: user.organizationId,
          organizationName: user.organization?.name,
        },
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { success: false, message: 'Database error occurred' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

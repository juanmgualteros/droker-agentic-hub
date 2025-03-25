import { NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const LOGO_PATH = join(process.cwd(), 'public', 'uploads');
const LOGO_FILE = 'logo';

// Ensure uploads directory exists
async function ensureUploadsDirectory() {
  if (!existsSync(LOGO_PATH)) {
    await mkdir(LOGO_PATH, { recursive: true });
  }
}

export async function GET() {
  try {
    await ensureUploadsDirectory();
    
    // Check if logo exists
    const logoPath = join(LOGO_PATH, LOGO_FILE);
    if (!existsSync(logoPath)) {
      return NextResponse.json({ logoUrl: null });
    }

    // Return the URL to the logo
    return NextResponse.json({ logoUrl: `/uploads/${LOGO_FILE}` });
  } catch (error) {
    console.error('Error getting logo:', error);
    return NextResponse.json({ error: 'Failed to get logo' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('logo') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Ensure uploads directory exists
    await ensureUploadsDirectory();

    // Write the file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const logoPath = join(LOGO_PATH, LOGO_FILE);
    await writeFile(logoPath, buffer);

    // Return the URL to the uploaded logo
    return NextResponse.json({ logoUrl: `/uploads/${LOGO_FILE}` });
  } catch (error) {
    console.error('Error uploading logo:', error);
    return NextResponse.json({ error: 'Failed to upload logo' }, { status: 500 });
  }
} 
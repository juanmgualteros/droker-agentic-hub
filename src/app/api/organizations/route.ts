import { NextResponse } from 'next/server';

// This is a mock database. In a real application, you would use a proper database.
let organizations = [
  {
    id: "1",
    name: "Acme Corp",
    state: "ACTIVE",
    createdAt: "2024-01-01",
    products: [],
    apiKeys: [],
  },
  {
    id: "2",
    name: "Globex Corp",
    state: "ACTIVE",
    createdAt: "2024-01-02",
    products: [],
    apiKeys: [],
  },
];

export async function GET() {
  return NextResponse.json(organizations);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newOrganization = {
      id: String(organizations.length + 1),
      name: body.name,
      state: "ACTIVE",
      createdAt: new Date().toISOString().split('T')[0],
      products: body.products || [],
      apiKeys: body.apiKeys || [],
    };

    organizations.push(newOrganization);

    return NextResponse.json(newOrganization, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create organization' },
      { status: 500 }
    );
  }
} 
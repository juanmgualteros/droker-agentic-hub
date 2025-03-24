import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

interface Props {
  params: {
    id: string;
  };
}

export async function PUT(request: Request, { params }: Props) {
  const supabase = createRouteHandlerClient({ cookies });
  const data = await request.json();

  const { error } = await supabase
    .from('organizations')
    .update({
      name: data.name,
      state: data.state,
      subscription_id: data.subscription_id,
    })
    .eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Organization updated successfully' });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase
    .from('organizations')
    .delete()
    .eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Delete related records first
  await prisma.$transaction([
    // Delete API keys
    prisma.apiKey.deleteMany({
      where: { organizationId: params.id }
    }),
    // Delete subscription
    prisma.subscription.deleteMany({
      where: { organizationId: params.id }
    }),
    // Delete products
    prisma.product.deleteMany({
      where: { organizationId: params.id }
    }),
    // Delete users
    prisma.user.deleteMany({
      where: { organizationId: params.id }
    }),
    // Finally delete the organization
    prisma.organization.delete({
      where: { id: params.id }
    })
  ]);

  revalidatePath('/superadmin/organizations');
  return NextResponse.json({ message: 'Organization deleted successfully' });
} 
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

export async function PUT(request: Request, { params }: Props) {
  const supabase = createRouteHandlerClient({ cookies });
  const data = await request.json();

  const { error } = await supabase
    .from('products')
    .update({
      name: data.name,
      description: data.description,
      status: data.status,
    })
    .eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Product updated successfully' });
}

export async function DELETE(_request: Request, { params }: Props) {
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Product deleted successfully' });
} 
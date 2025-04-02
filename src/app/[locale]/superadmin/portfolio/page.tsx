import { Suspense } from 'react';
import PortfolioClient from './portfolio-client';

export default function PortfolioPage({ params }: { params: { locale: string } }) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>}>
      <PortfolioClient params={params} />
    </Suspense>
  );
}

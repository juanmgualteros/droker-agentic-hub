import { ProductTabs } from "@/components/products/product-tabs"

interface ProductConfigLayoutProps {
  children: React.ReactNode
  params: {
    id: string
  }
}

export default function ProductConfigLayout({
  children,
  params
}: ProductConfigLayoutProps) {
  return (
    <div className="space-y-6">
      <ProductTabs productId={params.id} />
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  )
} 
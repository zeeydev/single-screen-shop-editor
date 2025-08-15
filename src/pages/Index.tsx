import { useState } from "react";
import { ProductDetails } from "@/components/ProductDetails";
import { AdminPanel } from "@/components/AdminPanel";
import electricGrill from "@/assets/electric-grill.jpg";

interface ProductData {
  title: string;
  price: string;
  description: string;
  condition: string;
  category: string;
  location: string;
  postedDate: string;
  views: number;
  seller: {
    name: string;
    memberSince: string;
    rating: number;
    totalAds: number;
  };
  images: string[];
}

const Index = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [productData, setProductData] = useState<ProductData>({
    title: "Churrasqueira Elétrica",
    price: "R$ 50",
    description: "Churrasqueira elétrica para preparar seus grelhados com praticidade. Ideal para diversas receitas e momentos de lazer.",
    condition: "Usado",
    category: "Eletroportáteis Para Cozinha e Limpeza",
    location: "Fortaleza, CE",
    postedDate: "14/08 às 12:49",
    views: 127,
    seller: {
      name: "João Silva",
      memberSince: "2020",
      rating: 4.8,
      totalAds: 23
    },
    images: ["/lovable-uploads/bcd4b6fb-d172-4f04-b677-d63cf27bd0b7.png", electricGrill, electricGrill]
  });

  const handleSaveProduct = (newData: ProductData) => {
    setProductData(newData);
    setIsAdminMode(false);
  };

  const handleEditProduct = () => {
    setIsAdminMode(true);
  };

  const handleCancelEdit = () => {
    setIsAdminMode(false);
  };

  return (
    <>
      {isAdminMode ? (
        <AdminPanel
          productData={productData}
          onSave={handleSaveProduct}
          onCancel={handleCancelEdit}
        />
      ) : (
        <ProductDetails
          productData={productData}
          onEdit={handleEditProduct}
          isAdmin={true}
        />
      )}
    </>
  );
};

export default Index;

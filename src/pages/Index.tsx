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
    title: "Churrasqueira Elétrica Grill Premium 2000W",
    price: "R$ 299,00",
    description: "Churrasqueira elétrica de alta qualidade, perfeita para uso interno e externo. Com 2000W de potência, controle de temperatura ajustável e superfície antiaderente. Inclui bandeja coletora removível para fácil limpeza. Ideal para apartamentos e casas. Produto em excelente estado de conservação, pouco uso.",
    condition: "Usado",
    category: "Eletrodomésticos",
    location: "Fortaleza, CE",
    postedDate: "Há 2 dias",
    views: 127,
    seller: {
      name: "João Silva",
      memberSince: "2020",
      rating: 4.8,
      totalAds: 23
    },
    images: [electricGrill, electricGrill, electricGrill]
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

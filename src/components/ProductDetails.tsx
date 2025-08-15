import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, Share2, MessageCircle, Search, Bell, User, ChevronRight } from "lucide-react";

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

interface ProductDetailsProps {
  productData: ProductData;
  onEdit?: () => void;
  isAdmin?: boolean;
}

export const ProductDetails = ({ productData, onEdit, isAdmin = false }: ProductDetailsProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="min-h-screen bg-olx-light-gray">
      {/* Header OLX */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-1">
                <div className="w-8 h-8 bg-olx-purple rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
                <div className="w-8 h-8 bg-olx-orange rounded-full flex items-center justify-center -ml-2">
                  <span className="text-white font-bold text-lg">X</span>
                </div>
              </div>
              
              <div className="relative flex-1 max-w-md">
                <Input
                  placeholder="Buscar"
                  className="pl-4 pr-10 border-gray-300 focus:border-olx-purple"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <span className="text-sm text-olx-gray hover:text-olx-purple cursor-pointer">Plano Profissional</span>
              <span className="text-sm text-olx-gray hover:text-olx-purple cursor-pointer">Meus Anúncios</span>
              <span className="text-sm text-olx-gray hover:text-olx-purple cursor-pointer">Chat</span>
              <Bell className="w-5 h-5 text-olx-gray hover:text-olx-purple cursor-pointer" />
              <span className="text-sm text-olx-gray hover:text-olx-purple cursor-pointer">Entrar</span>
              <Button className="bg-olx-orange hover:bg-olx-orange/90 text-white px-6">
                Anunciar grátis
              </Button>
              {isAdmin && (
                <Button onClick={onEdit} variant="outline" className="ml-4">
                  Editar Produto
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center space-x-2 text-sm text-olx-gray">
            <span className="hover:text-olx-purple cursor-pointer">Ceará</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-olx-purple cursor-pointer">Fortaleza e região</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-olx-purple cursor-pointer">Eletroportáteis Para Cozinha e Limpeza</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-olx-purple cursor-pointer">Fortaleza</span>
            <ChevronRight className="w-4 h-4" />
            <span>Messejana</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {/* Product Images */}
          <div className="lg:col-span-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="aspect-square overflow-hidden rounded-lg bg-white border">
                    <img
                      src={productData.images[selectedImage]}
                      alt={productData.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex space-x-2 overflow-x-auto">
                    {productData.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? "border-olx-purple" : "border-gray-200"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${productData.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Badges */}
                <div className="flex gap-2 mt-4">
                  <Badge className="bg-olx-purple text-white">
                    Pague Online
                  </Badge>
                  <Badge variant="outline" className="border-olx-purple text-olx-purple">
                    Garantia da OLX
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Product Description */}
            <Card className="mt-4 border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{productData.title}</h2>
                <p className="text-gray-700 leading-relaxed">{productData.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Product Info & Seller */}
          <div className="lg:col-span-3">
            {/* Product Price & Actions */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-4xl font-bold text-gray-900">{productData.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">💳</span>
                      </div>
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">🏦</span>
                      </div>
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">💰</span>
                      </div>
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">💳</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">1x sem juros de {productData.price}</p>
                    <p className="text-sm text-olx-purple cursor-pointer hover:underline">Mais opções de parcelamento</p>
                  </div>

                  <div className="text-sm text-olx-purple cursor-pointer hover:underline flex items-center gap-1">
                    <span>🏷️</span>
                    <span>Simular empréstimo</span>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-olx-orange hover:bg-olx-orange/90 text-white" size="lg">
                      🛒 Comprar
                    </Button>
                    
                    <Button variant="outline" className="w-full border-olx-orange text-olx-orange hover:bg-olx-orange hover:text-white" size="lg">
                      💬 Chat
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">publicidade</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
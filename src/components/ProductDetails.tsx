import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, MessageCircle, MapPin, Calendar, Eye, Star } from "lucide-react";
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

interface ProductDetailsProps {
  productData: ProductData;
  onEdit?: () => void;
  isAdmin?: boolean;
}

export const ProductDetails = ({ productData, onEdit, isAdmin = false }: ProductDetailsProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">MarketPlace</h1>
            </div>
            {isAdmin && (
              <Button onClick={onEdit} variant="outline">
                Editar Produto
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Images */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="aspect-square overflow-hidden rounded-lg bg-muted">
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
                          selectedImage === index ? "border-primary" : "border-border"
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
              </CardContent>
            </Card>

            {/* Product Description */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Descrição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{productData.description}</p>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Condição:</span>
                    <p className="font-medium">{productData.condition}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Categoria:</span>
                    <p className="font-medium">{productData.category}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Info & Seller */}
          <div className="space-y-6">
            {/* Product Price & Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{productData.title}</h1>
                    <p className="text-3xl font-bold text-primary mt-2">{productData.price}</p>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{productData.location}</span>
                    <Calendar className="w-4 h-4 ml-4" />
                    <span>{productData.postedDate}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>{productData.views} visualizações</span>
                  </div>

                  <div className="flex space-x-2">
                    <Badge variant="secondary">{productData.condition}</Badge>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Conversar
                    </Button>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setIsFavorited(!isFavorited)}
                      >
                        <Heart className={`w-4 h-4 mr-2 ${isFavorited ? "fill-current text-red-500" : ""}`} />
                        Favoritar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartilhar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle>Vendedor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold">
                        {productData.seller.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{productData.seller.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Membro desde {productData.seller.memberSince}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{productData.seller.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      • {productData.seller.totalAds} anúncios
                    </span>
                  </div>

                  <Button variant="outline" className="w-full">
                    Ver perfil do vendedor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
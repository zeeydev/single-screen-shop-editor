import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Upload, Plus } from "lucide-react";

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

interface AdminPanelProps {
  productData: ProductData;
  onSave: (data: ProductData) => void;
  onCancel: () => void;
}

export const AdminPanel = ({ productData, onSave, onCancel }: AdminPanelProps) => {
  const [formData, setFormData] = useState<ProductData>(productData);
  const [newImages, setNewImages] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSellerChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      seller: {
        ...prev.seller,
        [field]: value
      }
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setNewImages(prev => [...prev, result]);
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, result]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Painel Administrativo</h1>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informações do Produto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título do Produto</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Digite o título do produto"
                />
              </div>

              <div>
                <Label htmlFor="price">Preço</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="Ex: R$ 299,00"
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Descreva o produto em detalhes"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="condition">Condição</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) => handleInputChange("condition", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a condição" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Novo">Novo</SelectItem>
                      <SelectItem value="Usado">Usado</SelectItem>
                      <SelectItem value="Seminovo">Seminovo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Eletrodomésticos">Eletrodomésticos</SelectItem>
                      <SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
                      <SelectItem value="Casa e Jardim">Casa e Jardim</SelectItem>
                      <SelectItem value="Móveis">Móveis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Cidade, Estado"
                  />
                </div>

                <div>
                  <Label htmlFor="views">Visualizações</Label>
                  <Input
                    id="views"
                    type="number"
                    value={formData.views}
                    onChange={(e) => handleInputChange("views", parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images Management */}
          <Card>
            <CardHeader>
              <CardTitle>Imagens do Produto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Produto ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                      {index === 0 && (
                        <Badge className="absolute bottom-1 left-1" variant="secondary">
                          Principal
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Clique para adicionar imagens
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seller Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Informações do Vendedor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="sellerName">Nome do Vendedor</Label>
                  <Input
                    id="sellerName"
                    value={formData.seller.name}
                    onChange={(e) => handleSellerChange("name", e.target.value)}
                    placeholder="Nome completo"
                  />
                </div>

                <div>
                  <Label htmlFor="memberSince">Membro desde</Label>
                  <Input
                    id="memberSince"
                    value={formData.seller.memberSince}
                    onChange={(e) => handleSellerChange("memberSince", e.target.value)}
                    placeholder="2020"
                  />
                </div>

                <div>
                  <Label htmlFor="rating">Avaliação</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.seller.rating}
                    onChange={(e) => handleSellerChange("rating", parseFloat(e.target.value) || 0)}
                    placeholder="4.5"
                  />
                </div>

                <div>
                  <Label htmlFor="totalAds">Total de Anúncios</Label>
                  <Input
                    id="totalAds"
                    type="number"
                    value={formData.seller.totalAds}
                    onChange={(e) => handleSellerChange("totalAds", parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Сяке Ролл',
    description: 'Лосось, авокадо, сливочный сыр',
    price: 450,
    category: 'rolls',
    image: '/img/58420bc0-0f5f-4499-93ba-4b31d1911248.jpg'
  },
  {
    id: 2,
    name: 'Нигири Магуро',
    description: 'Тунец на рисовой подушке',
    price: 280,
    category: 'nigiri',
    image: '/img/301c6901-2fd3-4823-8488-1621b6908cd3.jpg'
  },
  {
    id: 3,
    name: 'Калифорния',
    description: 'Краб, огурец, икра тобико',
    price: 380,
    category: 'rolls',
    image: '/img/b637e8d4-7da2-4092-8e9b-b53653823aee.jpg'
  },
  {
    id: 4,
    name: 'Нигири Эби',
    description: 'Креветка на рисовой подушке',
    price: 250,
    category: 'nigiri',
    image: '/img/301c6901-2fd3-4823-8488-1621b6908cd3.jpg'
  },
  {
    id: 5,
    name: 'Спайси Тунец',
    description: 'Тунец, огурец, спайси соус',
    price: 420,
    category: 'rolls',
    image: '/img/58420bc0-0f5f-4499-93ba-4b31d1911248.jpg'
  },
  {
    id: 6,
    name: 'Филадельфия',
    description: 'Лосось, сливочный сыр, огурец',
    price: 490,
    category: 'rolls',
    image: '/img/b637e8d4-7da2-4092-8e9b-b53653823aee.jpg'
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [userBalance] = useState(1500);
  const [contestTickets] = useState(3);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const bonusTickets = Math.floor(cartTotal / 500);
  const bonusRubles = Math.floor(cartTotal * 0.05);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = activeCategory === 'all'
    ? mockProducts
    : mockProducts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🍣</div>
              <h1 className="text-2xl font-bold text-primary">Urus Sushi</h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" className="gap-2">
                <Icon name="Home" size={20} />
                <span>Главная</span>
              </Button>
              <Button variant="ghost" className="gap-2" onClick={() => navigate('/profile')}>
                <Icon name="User" size={20} />
                <span>Профиль</span>
              </Button>
              <Button variant="ghost" className="gap-2" onClick={() => navigate('/contests')}>
                <Icon name="Trophy" size={20} />
                <span>Конкурсы</span>
              </Button>
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-4 mr-4">
                <Badge variant="secondary" className="gap-2 py-2 px-3">
                  <Icon name="Wallet" size={16} />
                  <span>{userBalance} ₽</span>
                </Badge>
                <Badge variant="outline" className="gap-2 py-2 px-3">
                  <Icon name="Ticket" size={16} />
                  <span>{contestTickets}</span>
                </Badge>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button className="relative gap-2 bg-accent hover:bg-accent/90">
                    <Icon name="ShoppingCart" size={20} />
                    <span className="hidden sm:inline">Корзина</span>
                    {cartItemsCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-primary">
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle className="text-2xl">Корзина</SheetTitle>
                  </SheetHeader>

                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-[50vh] overflow-y-auto">
                          {cart.map(item => (
                            <Card key={item.id} className="p-4">
                              <div className="flex gap-4">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h3 className="font-semibold">{item.name}</h3>
                                  <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, -1)}
                                    >
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, 1)}
                                    >
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="ml-auto text-destructive"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      <Icon name="Trash2" size={16} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>

                        <Separator />

                        <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                          <div className="flex justify-between text-sm">
                            <span>Сумма заказа:</span>
                            <span className="font-semibold">{cartTotal} ₽</span>
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Icon name="Ticket" size={14} />
                              Билеты на конкурс:
                            </span>
                            <span>+{bonusTickets}</span>
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Icon name="Gift" size={14} />
                              Бонусные рубли (5%):
                            </span>
                            <span>+{bonusRubles} ₽</span>
                          </div>
                        </div>

                        <Button className="w-full bg-accent hover:bg-accent/90 h-12 text-base">
                          Оформить заказ
                        </Button>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Categories */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveCategory}>
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
            <TabsTrigger value="all" className="gap-2">
              <span>Все</span>
            </TabsTrigger>
            <TabsTrigger value="rolls" className="gap-2">
              <span>🍱</span>
              <span>Роллы</span>
            </TabsTrigger>
            <TabsTrigger value="nigiri" className="gap-2">
              <span>🍣</span>
              <span>Нигири</span>
            </TabsTrigger>
            <TabsTrigger value="sets" className="gap-2">
              <span>🎁</span>
              <span>Сеты</span>
            </TabsTrigger>
            <TabsTrigger value="drinks" className="gap-2">
              <span>🥤</span>
              <span>Напитки</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeCategory} className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                      <Button
                        onClick={() => addToCart(product)}
                        className="bg-accent hover:bg-accent/90 gap-2"
                      >
                        <Icon name="Plus" size={16} />
                        <span>В корзину</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Banner */}
        <Card className="p-6 bg-gradient-to-r from-accent/10 to-secondary/10 border-accent/20 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🎉</div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Еженедельный конкурс</h3>
                <p className="text-sm text-muted-foreground">
                  За каждые 500₽ заказа получайте билет на розыгрыш призов
                </p>
              </div>
            </div>
            <Button variant="outline" className="gap-2" onClick={() => navigate('/contests')}>
              <Icon name="Trophy" size={16} />
              <span>Подробнее</span>
            </Button>
          </div>
        </Card>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg">
        <div className="grid grid-cols-4 gap-1 p-2">
          <Button variant="default" className="flex-col h-auto py-2 gap-1">
            <Icon name="Home" size={20} />
            <span className="text-xs">Главная</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-2 gap-1" onClick={() => navigate('/profile')}>
            <Icon name="User" size={20} />
            <span className="text-xs">Профиль</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-2 gap-1" onClick={() => navigate('/contests')}>
            <Icon name="Trophy" size={20} />
            <span className="text-xs">Конкурсы</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-2 gap-1">
            <Icon name="Settings" size={20} />
            <span className="text-xs">Еще</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user] = useState({
    phone: '+7 999 123 45 67',
    balance: 1500,
    avatar: null,
  });

  const [orders] = useState([
    {
      id: 1,
      date: '2025-09-25 18:30',
      total: 1240,
      status: 'completed',
      items: [
        { name: 'Сяке Ролл', quantity: 2, price: 450 },
        { name: 'Нигири Магуро', quantity: 1, price: 280 },
      ],
    },
    {
      id: 2,
      date: '2025-09-22 14:15',
      total: 890,
      status: 'completed',
      items: [
        { name: 'Калифорния', quantity: 1, price: 380 },
        { name: 'Филадельфия', quantity: 1, price: 490 },
      ],
    },
  ]);

  const [tickets] = useState([
    {
      id: 1,
      contestName: 'Еженедельный розыгрыш',
      ticketNumber: 12345,
      orderId: 1,
      isWinner: false,
      createdAt: '2025-09-25',
    },
    {
      id: 2,
      contestName: 'Еженедельный розыгрыш',
      ticketNumber: 12346,
      orderId: 1,
      isWinner: false,
      createdAt: '2025-09-25',
    },
    {
      id: 3,
      contestName: 'Еженедельный розыгрыш',
      ticketNumber: 12347,
      orderId: 2,
      isWinner: false,
      createdAt: '2025-09-22',
    },
  ]);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
              <Icon name="ArrowLeft" size={20} />
              <span>Назад</span>
            </Button>
            <h1 className="text-xl font-bold text-primary">Профиль</h1>
            <Button variant="ghost" className="gap-2">
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* User Info Card */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar || undefined} />
              <AvatarFallback className="text-2xl bg-secondary">
                <Icon name="User" size={40} />
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">{user.phone}</h2>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Badge variant="secondary" className="gap-2 py-2 px-4">
                  <Icon name="Wallet" size={18} />
                  <span className="text-base">{user.balance} ₽</span>
                </Badge>
                <Badge variant="outline" className="gap-2 py-2 px-4">
                  <Icon name="Ticket" size={18} />
                  <span className="text-base">{tickets.length} билетов</span>
                </Badge>
              </div>
            </div>

            <Button className="gap-2">
              <Icon name="Plus" size={18} />
              <span>Пополнить баланс</span>
            </Button>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders" className="gap-2">
              <Icon name="ShoppingBag" size={18} />
              <span>История заказов</span>
            </TabsTrigger>
            <TabsTrigger value="tickets" className="gap-2">
              <Icon name="Ticket" size={18} />
              <span>Мои билеты</span>
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-6 space-y-4">
            {orders.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">У вас пока нет заказов</p>
              </Card>
            ) : (
              orders.map((order) => (
                <Card key={order.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">Заказ #{order.id}</h3>
                        <Badge
                          variant={order.status === 'completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {order.status === 'completed' ? 'Выполнен' : 'В обработке'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{order.total} ₽</p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium">{item.price * item.quantity} ₽</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Icon name="RotateCcw" size={14} />
                      <span>Повторить заказ</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Icon name="FileText" size={14} />
                      <span>Детали</span>
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Tickets Tab */}
          <TabsContent value="tickets" className="mt-6">
            <Card className="p-6 mb-6 bg-gradient-to-r from-accent/10 to-secondary/10 border-accent/20">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🎉</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Как получить билеты?</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 1 билет за каждые 500₽ заказа</li>
                    <li>• Чем больше заказов - тем больше шансов выиграть</li>
                    <li>• Розыгрыш проводится каждый четверг в 20:00</li>
                  </ul>
                </div>
              </div>
            </Card>

            {tickets.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="Ticket" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">У вас пока нет билетов</p>
                <Button onClick={() => navigate('/')} className="gap-2">
                  <Icon name="ShoppingCart" size={18} />
                  <span>Перейти к покупкам</span>
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tickets.map((ticket) => (
                  <Card
                    key={ticket.id}
                    className={`p-6 relative overflow-hidden ${
                      ticket.isWinner ? 'border-accent border-2' : ''
                    }`}
                  >
                    {ticket.isWinner && (
                      <Badge className="absolute top-4 right-4 bg-accent">
                        <Icon name="Trophy" size={14} className="mr-1" />
                        Победитель
                      </Badge>
                    )}
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">🎫</div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">
                          {ticket.contestName}
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          #{ticket.ticketNumber}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Заказ #{ticket.orderId} • {ticket.createdAt}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg">
        <div className="grid grid-cols-4 gap-1 p-2">
          <Button variant="ghost" className="flex-col h-auto py-2 gap-1" onClick={() => navigate('/')}>
            <Icon name="Home" size={20} />
            <span className="text-xs">Главная</span>
          </Button>
          <Button variant="default" className="flex-col h-auto py-2 gap-1">
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

export default Profile;
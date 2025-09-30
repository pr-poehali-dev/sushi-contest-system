import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Contests = () => {
  const navigate = useNavigate();

  const [activeContest] = useState({
    id: 1,
    title: 'Еженедельный розыгрыш',
    description: 'Каждую неделю разыгрываем ценные призы среди участников',
    prize: 'Бесплатный набор роллов на выбор',
    startDate: '2025-09-23',
    endDate: '2025-10-03',
    status: 'active',
    totalTickets: 156,
    myTickets: 3,
  });

  const [pastContests] = useState([
    {
      id: 2,
      title: 'Розыгрыш сентября',
      prize: 'Сет "Киото" (32 ролла)',
      endDate: '2025-09-23',
      winner: 'Победитель: +7 999 *** **45',
      winningTicket: 12234,
      totalTickets: 142,
    },
    {
      id: 3,
      title: 'Летний розыгрыш',
      prize: 'Сертификат на 3000₽',
      endDate: '2025-09-16',
      winner: 'Победитель: +7 999 *** **12',
      winningTicket: 11987,
      totalTickets: 128,
    },
  ]);

  const daysLeft = 3;
  const progressPercent = 43;

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
            <h1 className="text-xl font-bold text-primary">Конкурсы</h1>
            <Button variant="ghost" onClick={() => navigate('/profile')} className="gap-2">
              <Icon name="User" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Active Contest */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>🏆</span>
            <span>Текущий конкурс</span>
          </h2>

          <Card className="overflow-hidden">
            <div className="p-6 bg-gradient-to-br from-accent/20 via-secondary/10 to-primary/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{activeContest.title}</h3>
                  <p className="text-muted-foreground mb-4">{activeContest.description}</p>
                </div>
                <Badge className="bg-accent text-white">Активен</Badge>
              </div>

              <div className="bg-white/80 backdrop-blur rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">🎁</div>
                  <div>
                    <p className="text-sm text-muted-foreground">Главный приз</p>
                    <p className="font-semibold text-lg">{activeContest.prize}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">До окончания</span>
                  <span className="text-sm font-bold">{daysLeft} дня</span>
                </div>
                <Progress value={progressPercent} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground text-center">
                  Розыгрыш: {activeContest.endDate} в 20:00
                </p>
              </div>
            </div>

            <Separator />

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-3xl font-bold text-primary">{activeContest.totalTickets}</p>
                  <p className="text-sm text-muted-foreground">Всего билетов</p>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg border-2 border-accent/30">
                  <p className="text-3xl font-bold text-accent">{activeContest.myTickets}</p>
                  <p className="text-sm text-muted-foreground">Моих билетов</p>
                </div>
              </div>

              <Button
                onClick={() => navigate('/')}
                className="w-full bg-accent hover:bg-accent/90 h-12 text-base gap-2"
              >
                <Icon name="Plus" size={20} />
                <span>Получить больше билетов</span>
              </Button>
            </div>
          </Card>
        </div>

        {/* Rules */}
        <Card className="p-6 mb-8">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Icon name="Info" size={20} />
            <span>Правила участия</span>
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>За каждые 500₽ заказа вы получаете 1 билет на участие в текущем конкурсе</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>Розыгрыш проводится каждый четверг в 20:00 по московскому времени</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>Победитель определяется случайным образом из всех участников</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>Чем больше у вас билетов - тем выше шанс выиграть</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>О победе мы уведомим вас в личном кабинете и по телефону</span>
            </li>
          </ul>
        </Card>

        {/* Past Contests */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Icon name="History" size={24} />
            <span>Прошедшие конкурсы</span>
          </h2>

          <div className="space-y-4">
            {pastContests.map((contest) => (
              <Card key={contest.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{contest.title}</h3>
                    <p className="text-sm text-muted-foreground">Завершен: {contest.endDate}</p>
                  </div>
                  <Badge variant="outline" className="w-fit">Завершен</Badge>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🎁</div>
                    <div>
                      <p className="text-sm text-muted-foreground">Приз</p>
                      <p className="font-semibold">{contest.prize}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Победитель</p>
                    <p className="font-semibold">{contest.winner}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Выигрышный билет</p>
                    <p className="font-semibold">#{contest.winningTicket}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Всего билетов</p>
                    <p className="font-semibold">{contest.totalTickets}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg">
        <div className="grid grid-cols-4 gap-1 p-2">
          <Button variant="ghost" className="flex-col h-auto py-2 gap-1" onClick={() => navigate('/')}>
            <Icon name="Home" size={20} />
            <span className="text-xs">Главная</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-2 gap-1" onClick={() => navigate('/profile')}>
            <Icon name="User" size={20} />
            <span className="text-xs">Профиль</span>
          </Button>
          <Button variant="default" className="flex-col h-auto py-2 gap-1">
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

export default Contests;
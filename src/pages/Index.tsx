import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Заявка отправлена! Скоро с тобой свяжемся 💜');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Dance Studio
          </h1>
          <div className="hidden md:flex gap-6">
            <a href="#styles" className="hover:text-primary transition-colors">Стили</a>
            <a href="#schedule" className="hover:text-primary transition-colors">Расписание</a>
            <a href="#trainers" className="hover:text-primary transition-colors">Тренеры</a>
            <a href="#gallery" className="hover:text-primary transition-colors">Галерея</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Цены</a>
            <a href="#contact" className="hover:text-primary transition-colors">Контакты</a>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform">
            Записаться
          </Button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Танцуй так, как чувствуешь
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Самая крутая студия танцев для тех, кто не боится быть собой. Неоклассика, классика и современка — выбирай свой вайб!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform text-lg px-8">
                Пробное занятие БЕСПЛАТНО
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary hover:bg-primary/10 text-lg px-8">
                Наш Telegram
              </Button>
            </div>
          </div>
          <div className="mt-16 animate-slide-up">
            <img 
              src="https://cdn.poehali.dev/projects/20b202c7-ed4d-41ec-a6e2-2114bd171b51/files/d04cad5a-6c3e-4bcd-a5ba-478fbca9fa2f.jpg"
              alt="Dance Studio"
              className="rounded-3xl shadow-2xl w-full max-w-5xl mx-auto object-cover h-[500px]"
            />
          </div>
        </div>
      </section>

      <section id="styles" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Направления танцев</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Выбери то, что заходит именно тебе</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary">
              <CardContent className="p-6">
                <div className="text-5xl mb-4">🩰</div>
                <h3 className="text-2xl font-bold mb-3 text-primary">Классика</h3>
                <p className="text-muted-foreground mb-4">
                  Элегантность и грация. Для тех, кто хочет чувствовать себя балериной. Строгая техника, красивые движения.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary" />
                    Постановка корпуса
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary" />
                    Классическая хореография
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary" />
                    Растяжка и гибкость
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-secondary">
              <CardContent className="p-6">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-2xl font-bold mb-3 text-secondary">Неоклассика</h3>
                <p className="text-muted-foreground mb-4">
                  Микс классики и современности. Красиво, эстетично, в тренде. Для тех, кто любит что-то особенное.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-secondary" />
                    Мягкая техника
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-secondary" />
                    Современные постановки
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-secondary" />
                    Работа с эмоциями
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-accent">
              <CardContent className="p-6">
                <div className="text-5xl mb-4">💃</div>
                <h3 className="text-2xl font-bold mb-3 text-accent">Современный танец</h3>
                <p className="text-muted-foreground mb-4">
                  Свобода движений! Импровизация, энергия, драйв. Танцуй как хочешь, выражай себя без границ.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-accent" />
                    Свободная пластика
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-accent" />
                    Импровизация
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-accent" />
                    Актуальная хореография
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="schedule" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Расписание занятий</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Выбирай удобное время</p>
          
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                  <div className="p-6 hover:bg-purple-50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon name="Calendar" className="text-primary" size={24} />
                      <h3 className="font-bold text-xl">Понедельник / Среда</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex justify-between py-2 border-b border-dashed">
                        <span>15:00 - 16:00</span>
                        <span className="font-semibold text-primary">Классика 6-9 лет</span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-dashed">
                        <span>16:30 - 17:30</span>
                        <span className="font-semibold text-secondary">Неоклассика 10-12 лет</span>
                      </li>
                      <li className="flex justify-between py-2">
                        <span>18:00 - 19:00</span>
                        <span className="font-semibold text-accent">Современный 13-15 лет</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-6 hover:bg-pink-50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon name="Calendar" className="text-accent" size={24} />
                      <h3 className="font-bold text-xl">Вторник / Четверг</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex justify-between py-2 border-b border-dashed">
                        <span>15:00 - 16:00</span>
                        <span className="font-semibold text-accent">Современный 6-9 лет</span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-dashed">
                        <span>16:30 - 17:30</span>
                        <span className="font-semibold text-primary">Классика 10-12 лет</span>
                      </li>
                      <li className="flex justify-between py-2">
                        <span>18:00 - 19:00</span>
                        <span className="font-semibold text-secondary">Неоклассика 13-15 лет</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 text-center">
                  <p className="text-sm font-medium">
                    <Icon name="Sparkles" className="inline mr-2" size={16} />
                    В субботу — открытые мастер-классы! Следи за анонсами
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="trainers" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Наши тренеры</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Профи своего дела, которые вдохновляют</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center text-white text-4xl">
                  АМ
                </div>
                <h3 className="text-xl font-bold mb-2">Анна Морозова</h3>
                <p className="text-primary font-semibold mb-3">Классический танец</p>
                <p className="text-sm text-muted-foreground">
                  15 лет опыта, выпускница хореографического училища. Участница международных конкурсов.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-secondary to-accent mx-auto mb-4 flex items-center justify-center text-white text-4xl">
                  ЕП
                </div>
                <h3 className="text-xl font-bold mb-2">Елена Петрова</h3>
                <p className="text-secondary font-semibold mb-3">Неоклассика</p>
                <p className="text-sm text-muted-foreground">
                  Хореограф современных постановок, работала с известными коллективами. 10 лет практики.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent to-primary mx-auto mb-4 flex items-center justify-center text-white text-4xl">
                  МС
                </div>
                <h3 className="text-xl font-bold mb-2">Мария Соколова</h3>
                <p className="text-accent font-semibold mb-3">Современный танец</p>
                <p className="text-sm text-muted-foreground">
                  Танцор-импровизатор, преподаватель contemporary. Победитель танцевальных баттлов.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Наша атмосфера</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Смотри, как это выглядит вживую</p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className="relative group overflow-hidden rounded-2xl">
              <img 
                src="https://cdn.poehali.dev/projects/20b202c7-ed4d-41ec-a6e2-2114bd171b51/files/350562e1-dcf9-4425-9596-01dfc257445a.jpg"
                alt="Dance"
                className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white font-bold text-xl">Индивидуальные занятия</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-2xl">
              <img 
                src="https://cdn.poehali.dev/projects/20b202c7-ed4d-41ec-a6e2-2114bd171b51/files/99dd620c-8238-49d1-9d57-4d9546a46aa2.jpg"
                alt="Group Dance"
                className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white font-bold text-xl">Групповые тренировки</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="border-2 border-primary hover:bg-primary/10">
              <Icon name="Send" className="mr-2" size={20} />
              Больше фото в Telegram
            </Button>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Стоимость занятий</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Выбирай тариф под себя</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-2xl transition-all hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">Разовое</h3>
                <div className="text-4xl font-bold text-primary mb-4">1200 ₽</div>
                <p className="text-muted-foreground mb-6">Одно занятие</p>
                <ul className="space-y-3 mb-6 text-left">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span>1 час тренировки</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span>Любое направление</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">Записаться</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary hover:shadow-2xl transition-all hover:-translate-y-2 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                Популярный
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">Абонемент</h3>
                <div className="text-4xl font-bold text-primary mb-4">4000 ₽</div>
                <p className="text-muted-foreground mb-6">8 занятий / месяц</p>
                <ul className="space-y-3 mb-6 text-left">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span>8 часов тренировок</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span>Экономия 1600 ₽</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span>Заморозка абонемента</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-primary to-accent">Купить</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">Безлимит</h3>
                <div className="text-4xl font-bold text-primary mb-4">6500 ₽</div>
                <p className="text-muted-foreground mb-6">Безлимит / месяц</p>
                <ul className="space-y-3 mb-6 text-left">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span>Неограниченно</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span>Все направления</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={18} />
                    <span>Приоритетная запись</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">Купить</Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl max-w-3xl mx-auto">
            <p className="text-lg font-semibold">
              <Icon name="Gift" className="inline mr-2" size={20} />
              Первое занятие БЕСПЛАТНО для новичков!
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Записаться на пробное</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Заполни форму, и мы свяжемся с тобой в течение дня</p>
          
          <Card className="shadow-2xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Твоё имя</label>
                  <Input 
                    placeholder="Как тебя зовут?"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Телефон</label>
                  <Input 
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Расскажи о себе (необязательно)</label>
                  <Textarea 
                    placeholder="Какое направление интересует? Есть ли опыт танцев?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform text-lg"
                >
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <Icon name="MapPin" className="mx-auto mb-3 text-primary" size={32} />
              <h3 className="font-bold mb-2">Адрес</h3>
              <p className="text-sm text-muted-foreground">ул. Танцевальная, 15<br/>Москва, Россия</p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-md">
              <Icon name="Phone" className="mx-auto mb-3 text-primary" size={32} />
              <h3 className="font-bold mb-2">Телефон</h3>
              <p className="text-sm text-muted-foreground">+7 (999) 123-45-67<br/>Звони с 10:00 до 20:00</p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-md">
              <Icon name="Mail" className="mx-auto mb-3 text-primary" size={32} />
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">info@dancestudio.ru<br/>Ответим в течение дня</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-primary to-accent text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Dance Studio</h2>
          <p className="mb-6 opacity-90">Танцуй, чувствуй, живи полной жизнью!</p>
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="hover:scale-110 transition-transform">
              <Icon name="Send" size={28} />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <Icon name="Youtube" size={28} />
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <Icon name="MessageCircle" size={28} />
            </a>
          </div>
          <p className="text-sm opacity-75">© 2024 Dance Studio. Создано с любовью к танцам 💜</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
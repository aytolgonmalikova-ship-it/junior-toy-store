# 🧸 Junior — магазин детских игрушек

Яркое одностраничное приложение (SPA) в мультяшном стиле на **React + Vite + Tailwind CSS**.

## Возможности
- 🌍 Мультиязычность: RU / KG / EN (`react-i18next`, файлы в `src/locales/`)
- 🌞/🌙 Светлая и тёмная («звёздная ночь») темы через `ThemeContext`, выбор сохраняется в `localStorage`
- 🧩 Каталог с фильтром по категориям (категория хранится в URL: `/catalog?category=plush`)
- ⏳ Mock API на `Promise` + `setTimeout` с ответом в стиле MongoDB (`_id`, `name`, `category`, `price`, `age`, `image`)
- 🏀 Состояние загрузки (прыгающий мячик) и ошибки (грустный мишка + «Попробовать снова»).
  В каталоге есть демо-кнопки «Обновить» и «Показать ошибку»; кроме того, ~8% запросов падают случайно
- 💬 Заказ в WhatsApp с готовым текстом, плавающая кнопка WhatsApp (FAB)
- 📱 Mobile-first адаптив, бургер-меню, `prefers-reduced-motion`
- 🛠️ Админ-панель `/admin` с ролями: CRUD товаров и управление администраторами (подробнее ниже)

## Запуск
Нужен Node.js 18+.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # продакшн-сборка в dist/
npm run preview   # просмотр сборки
```

## Архив проекта
```bash
npm run zip       # создаст ../junior-toy-store.zip без node_modules и dist
```
Windows (PowerShell), из родительской папки:
```powershell
Compress-Archive -Path junior-toy-store\* -DestinationPath junior-toy-store.zip -Force
```
(перед этим удалите `node_modules` и `dist`, либо скопируйте проект без них).

## Структура
```
src/
├── assets/            # иллюстрации (облако, мишка для ошибки)
├── components/
│   ├── catalog/       # ToyCard, ToyCollection, CategoryFilter
│   ├── layout/        # Header, Footer, Layout, SkyBackdrop, WhatsAppFab, ScrollToTop
│   ├── sections/      # Hero, PopularToys, ServicesGrid, CtaBanner
│   └── ui/            # ToyButton, Loader, ErrorState, Logo, ThemeToggle, LanguageSwitcher…
├── config/site.js     # номер WhatsApp, навигация, категории
├── components/admin/  # вход, формы товара и админа, бейджи ролей, тосты
├── context/           # ThemeContext, AuthContext
├── hooks/             # useToys, useStores, useInView, useScrolled, useDebouncedValue
├── locales/           # ru.json, kg.json, en.json
├── pages/             # Home, About, Services, Catalog, Delivery, Contacts, NotFound
│   └── admin/         # AdminPage, ProductsPanel, AdminsPanel
├── services/          # api.js (mock API), toysStore, adminsStore, mockToys.json
├── i18n.js
└── main.jsx
public/toys/           # SVG-иллюстрации игрушек
```

## Настройка
- Номер WhatsApp и телефон — `src/config/site.js`
- Товары — `src/services/mockToys.json` (для реального бэкенда замените `fetchToys` в `src/services/api.js` на `fetch('/api/toys')`)
- Задержка и частота случайных ошибок API — константы в `src/services/api.js`

## Деплой
Используется `BrowserRouter`, поэтому на хостинге нужен fallback на `index.html`
(Netlify: файл `_redirects` с `/* /index.html 200`; Vercel делает это для Vite автоматически).

## Фото товаров
Фотографии в каталоге загружаются с Unsplash (`images.unsplash.com`, бесплатная [Unsplash License](https://unsplash.com/license),
разрешающая коммерческое использование без обязательной атрибуции). Поле `image` — фото, поле `illustration` — мультяшная SVG
из `public/toys/`, которая показывается, если фото не загрузилось. Пока фото грузится, в карточке виден плейсхолдер с эффектом shimmer.
Перед запуском настоящего магазина замените фото на снимки ваших товаров.

## Админ-панель
Переключатель «Админ-панель» / «Вернуться в магазин» находится в шапке сайта, адрес — `/admin`.

| Роль | Логин | Пароль | Доступ |
|---|---|---|---|
| 👑 Главный админ | `superadmin` | `0000` | товары + управление администраторами |
| 🛡️ Администратор | `manager` | `1111` | только товары |
| 🛡️ Администратор (заблокирован) | `bakyt` | `2222` | вход запрещён — для демонстрации |

- **Товары** (всем админам): статистика, поиск и фильтр, добавление / редактирование / удаление, живой предпросмотр карточки,
  автозаполнение KG/EN из RU, выбор запасной SVG-иконки, сброс каталога до стандартных 12 игрушек.
- **Администрация** (только Главный админ): добавление, редактирование, блокировка/разблокировка, удаление и сброс списка.
  Себя нельзя удалить, заблокировать или понизить в роли — так доступ к системе не потеряется.
- **Хранение:** товары — `localStorage['junior-toys']` (при первом запуске копируются из `mockToys.json`),
  админы — `localStorage['junior-admins']`, сессия — `sessionStorage['junior-admin-session']` (до закрытия вкладки).
  Изменения сразу видны в каталоге без перезагрузки, в том числе в других открытых вкладках.
- Роль и статус проверяются по актуальному списку при каждом рендере: заблокированный или удалённый админ сразу выходит из системы.

> ⚠️ **Это демо-авторизация на стороне браузера, а не защита.** Пароли лежат в localStorage открытым текстом,
> и любой посетитель может изменить данные через DevTools. Для настоящего магазина нужен сервер:
> проверка пароля и ролей на бэкенде, хранение только хэшей паролей (bcrypt/argon2), сессии или JWT в httpOnly cookie,
> а каталог — в базе данных (например, MongoDB) с API, доступным только авторизованным администраторам.

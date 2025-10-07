# Telegram Mini App

A simple Telegram Mini App built with vanilla HTML, CSS, and JavaScript.

## Features

- 🎨 Telegram theme integration
- 📱 Responsive design
- 🔘 Main button integration
- 📳 Haptic feedback
- 👤 User information display
- 🎯 Interactive buttons and popups

## Setup Instructions

### 1. Deploy Your App with Tmole

Tmole is the easiest way to get a public HTTPS URL for your Mini App:

#### Quick Setup with Tmole
1. Install tmole globally:
   ```bash
   npm install -g tmole
   ```

2. Start your local server:
   ```bash
   npm run dev
   ```

3. In a new terminal, expose your local server:
   ```bash
   tmole 8080
   ```

4. Copy the HTTPS URL that tmole provides (e.g., `https://abc123.tmole.io`)

#### Alternative Options
- **GitHub Pages**: Push to GitHub, enable Pages in settings
- **Netlify**: Drag and drop to [netlify.com/drop](https://netlify.com/drop)
- **Vercel**: Run `npx vercel` in your project directory

### 2. Create a Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` command
3. Choose a name and username for your bot
4. Save the bot token you receive

### 3. Set Up Mini App

1. Send `/newapp` to @BotFather
2. Select your bot
3. Enter app title (e.g., "My Mini App")
4. Enter app description
5. Upload a 640x360 photo for the app
6. **Enter your app URL** (from step 1)
7. Choose a short name (used in app URL)

### 4. Test Your Mini App

1. Open your bot in Telegram
2. Send any message to activate the keyboard
3. Look for the "Mini App" button or menu
4. Click it to open your app!

## Development

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:8080` in your browser

**Note:** Some Telegram Web App features only work when accessed through Telegram, not in a regular browser.

### Testing in Telegram

For testing during development:
- **Tmole** (recommended): `tmole 8080` - instant HTTPS tunnel
- **ngrok**: Alternative tunneling service
- [Telegram Web App Debug](https://web.telegram.org/a/) for desktop testing

#### Development Workflow with Tmole
1. `npm run dev` (starts local server on port 8080)
2. `tmole 8080` (creates public HTTPS URL)
3. Use the tmole URL in @BotFather for your Mini App
4. Test directly in Telegram while developing!

## Bot Integration Example

Here's a simple Python bot example to handle Mini App data:

```python
import json
from telegram import Update, WebAppInfo, KeyboardButton, ReplyKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters

async def start(update: Update, context):
    web_app = WebAppInfo(url="YOUR_MINI_APP_URL_HERE")
    keyboard = [[KeyboardButton("Open Mini App", web_app=web_app)]]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
    
    await update.message.reply_text(
        "Welcome! Click the button below to open the Mini App:",
        reply_markup=reply_markup
    )

async def handle_web_app_data(update: Update, context):
    data = json.loads(update.effective_message.web_app_data.data)
    await update.message.reply_text(f"Received data: {data}")

# Set up your bot with these handlers
```

## Customization

- Modify `styles.css` for custom styling
- Edit `app.js` to add new functionality
- Update `index.html` for different UI elements
- The app automatically adapts to Telegram's theme (dark/light mode)

## Telegram Web App API Features Used

- `tg.expand()` - Expand app to full height
- `tg.MainButton` - Show/hide main button
- `tg.showAlert()` - Show alert popup
- `tg.showPopup()` - Show custom popup
- `tg.HapticFeedback` - Trigger device vibration
- `tg.sendData()` - Send data back to bot
- Theme variables for consistent styling

## Troubleshooting

1. **App doesn't load**: Check if your URL is HTTPS and publicly accessible
2. **Features don't work**: Some features only work inside Telegram, not in browser
3. **Styling issues**: Make sure you're using Telegram CSS variables
4. **Data not sending**: Check bot token and webhook setup

## Resources

- [Telegram Mini Apps Documentation](https://core.telegram.org/bots/webapps)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Web App Examples](https://github.com/telegram-mini-apps)
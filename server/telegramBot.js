import TelegramApi from 'node-telegram-bot-api';

const TOKEN = '1774039245:AAGlU1myaFCpn20mulZYLfaod3_z0RamNCc';

const bot = new TelegramApi(TOKEN, {polling: true});

bot.on('message', async (msg)=> {
    const text = msg.text;
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, 'Привет, мир!' + text);
});
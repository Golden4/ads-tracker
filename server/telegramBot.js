import TelegramApi from 'node-telegram-bot-api';

const TOKEN = '1774039245:AAGlU1myaFCpn20mulZYLfaod3_z0RamNCc';

const bot = new TelegramApi(TOKEN, {polling: false});

bot.on('message', (message)=> {
    bot.sendMessage('Привет, мир!', message);
})
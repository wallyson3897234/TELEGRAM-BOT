const { Telegraf, Markup } = require('telegraf');
const fs = require('fs');
const path = require('path');

const botToken = '7719749622:AAGlQ0DQHVCDWaQE1QAaONN7yXWX5lvtIUw';
const fotoMenu = '/sdcard/download/wl/fotos/menu.png';
const arquivo = __filename;

// Função para mostrar o menu principal com imagem
function menuPrincipal(ctx) {
  const nome = ctx.from.first_name || 'amigo(a)';
  return ctx.replyWithPhoto(
    { source: fotoMenu },
    {
      caption: `Olá, ${nome} seja bem-vindo(a) ao Slither.io Help. Precisa de ajuda com o quê?`,
      reply_markup: {
        inline_keyboard: [
          [{ text: 'MOD MOBILE', callback_data: 'mod_mobile' }],
          [{ text: 'MOD PC', callback_data: 'mod_pc' }],
          [{ text: 'MOD IOS', callback_data: 'mod_ios' }],
          [{ text: '🆘️ SUPORTE 🆘️', url: 'https://t.me/psicopataslowed' }]
        ]
      }
    }
  );
}

function iniciarBot() {
  const bot = new Telegraf(botToken);

  // Mostrar quem mandou mensagem (detalhado)
  bot.on('message', (ctx, next) => {
    const user = ctx.from.username ? '@' + ctx.from.username : `${ctx.from.first_name || 'Desconhecido'} (sem @)`;
    const tipo = ctx.message.text ? 'TEXTO' :
                 ctx.message.voice ? 'AUDIO' :
                 ctx.message.photo ? 'FOTO' :
                 ctx.message.document ? 'DOCUMENTO' :
                 ctx.message.sticker ? 'FIGURINHA' :
                 'OUTRO';
    const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    console.log('__________________________________');
console.log(`DE:   ${user}`);
console.log(`TIPO: ${tipo}`);
console.log(`HORA: ${hora}`);
console.log('__________________________________');

    return next();
  });

  // Comando /start
  bot.start((ctx) => {
    menuPrincipal(ctx);
  });

  bot.action('mod_mobile', async (ctx) => {
    await ctx.deleteMessage();
    await ctx.replyWithPhoto(
      { source: fotoMenu },
      {
        caption: 'SITE COM MELHORES MODS MOBILE!',
        reply_markup: {
          inline_keyboard: [
            [{ text: 'SITE', url: 'https://lucky-mods.onrender.com/mods/slitherio' }],
            [{ text: 'VOLTAR', callback_data: 'voltar_menu' }]
          ]
        }
      }
    );
  });

  bot.action('mod_pc', async (ctx) => {
    await ctx.deleteMessage();
    await ctx.replyWithPhoto(
      { source: fotoMenu },
      {
        caption: 'TENHO DUAS VARIAÇÕES DE MODS PARA PC SUPER BONS!',
        reply_markup: {
          inline_keyboard: [
            [{ text: 'NTL MOD', url: 'https://chromewebstore.google.com/detail/ntl-mod-for-slitherio/hpgaehmokjbdfkbgkeifbfogjalkpfgb' }],
            [{ text: 'FRONTIER MOD', url: 'https://chromewebstore.google.com/detail/frontier-slither/jkfiikecahagonfbnjfhjphocjlaacmc' }],
            [{ text: 'VOLTAR', callback_data: 'voltar_menu' }]
          ]
        }
      }
    );
  });

  bot.action('mod_ios', async (ctx) => {
    await ctx.deleteMessage();
    await ctx.replyWithPhoto(
      { source: fotoMenu },
      {
        caption: 'DESCULPE, OS MODS IOS AINDA NÃO ESTÃO DISPONÍVEIS.',
        reply_markup: {
          inline_keyboard: [
            [{ text: 'VOLTAR', callback_data: 'voltar_menu' }]
          ]
        }
      }
    );
  });

  bot.action('voltar_menu', async (ctx) => {
    try {
      await ctx.deleteMessage();
    } catch (e) {
      console.log('Erro ao apagar mensagem:', e.message);
    }
    menuPrincipal(ctx);
  });

  bot.launch()
    .then(() => {
      console.log('BOT RODANDO COM SUCESSO');
    })
    .catch((err) => {
      console.log(`❌ Erro ao iniciar o bot: ${err.description || err.message}`);
    });
}

// Detectar mudanças no próprio arquivo
fs.watchFile(arquivo, () => {
  console.clear();
  console.log('♻️  Bot.js atualizado. Reiniciando...');
  process.exit(0);
});

console.log('BOT INICIANDO...');
iniciarBot();
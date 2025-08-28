const QRCode = require('qrcode');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js');
const client = new Client();
client.on('qr', async (qr) => {
  const qrImageBase64 = await QRCode.toDataURL(qr);
  console.log('QR Code em imagem base64:\n' + qrImageBase64);
});


// apos isso ele diz que foi tudo certo
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

// E inicializa tudo 
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil
const usuariosAtendidos = new Set();

client.on('message', async msg => {
    const numero = msg.from;

    // Mostrar o menu apenas se for a primeira vez que o cliente entra
    if (!usuariosAtendidos.has(numero) && numero.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(1000);
        await chat.sendStateTyping();
        await delay(3000);

        const contact = await msg.getContact();
        const name = contact.pushname || 'cliente';

        await client.sendMessage(numero,
            `Olá!, ${name.split(" ")[0]} Sou o maçãzinho seu assistente virtual 🤖. Vou adiantar a conversa para nosso atendente, tá? Digite pra mim sobre o que quer falar:\n\n1 - Quero comprar um iphone\n2 - Quero Trocar de iphone\n3 - Formas de pagamento\n4 - Onde entregamos\n5 - Outras perguntas`
        );

        usuariosAtendidos.add(numero); // Marca como atendido
        return; // Finaliza aqui para não cair nos outros ifs
    }

    // Agora tratamos as opções válidas
    if (msg.body === '1') {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(numero, 'É seu primeiro iphone? Se for você vai se apaixonar ❤️');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(numero, 'Em nosso site temos todos os valores bem atualizados, já deu uma conferida? Irei mandar ele pra você aqui');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(numero, 'https://www.macanamao.com.br/');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(numero, 'Caso esteja procurando algum modelo que esteja sem valor no site, não se preocupe que é normal de alguns modelos. Só me diga qual é o modelo que o Gabriel já entra para te atender');
        return;
    }

    if (msg.body === '2') {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(numero, 'Certo! Eu preciso de algumas informações sobre o seu atual iPhone.');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(numero, 'Qual modelo e capacidade de armazenamento do seu iPhone?\n\n1 - Comprou ele lacrado ou seminovo? Caso seja seminovo, qual data e loja foi comprado?\n\n2 - Já trocou alguma peça dele?\n\n3 - Possui alguma avaria, algo que esteja com mal funcionamento?\n\n4 - Qual estado de conservação? Possui marcas de uso, riscos, trincados ou amassados?\n\n5 - Qual a saúde da bateria?');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(numero, 'Se possível, peço que nos envie foto ou vídeo do aparelho mostrando os detalhes.');
        await delay(15000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(numero, 'Já retornaremos após essas informações com atendimento humanizado 💁🏻‍♂️');
        return;
    }

    if (msg.body === '3') {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(numero, 'Certo! Aceitamos as seguintes formas de pagamento:\n\n💰 Dinheiro\n💳 Pix\n💳 Cartão em até 12x (*com acréscimo da máquina*)');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(numero, 'Se você viu alguma promoção nossa, lembre-se que aquele valor é referente ao pagamento à vista.');
        return;
    }

    if (msg.body === '4') {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(numero, 'Estamos situados em Saquarema/RJ e entregamos pessoalmente em toda a Região dos Lagos 🛵. Fora da Região enviamos apenas por Sedex.');
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(numero, 'Agora que você já sabe onde estamos localizados, escolha sobre o que quer falar:\n\n1 - Quero comprar um iPhone\n2 - Quero trocar de iPhone\n3 - Formas de pagamento\n5 - Outras perguntas');
        return;
    }

    if (msg.body === '5') {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(numero, 'Se você tiver outras dúvidas ou precisar de mais informações, por favor, fale aqui nesse WhatsApp que já já te responderemos 😊');
        return;
    }

    // Se não digitou nenhuma das opções válidas
    if (!['1', '2', '3', '4', '5'].includes(msg.body.trim())) {
        await client.sendMessage(numero, '❌ Não entendi esse comando. Caso queira ser atendido, basta digitar "falar com atendente".');
    }
});


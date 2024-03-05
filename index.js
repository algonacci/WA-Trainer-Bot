const wa = require("@open-wa/wa-automate");
const { localQuotes } = require("./quotes"); // Adjust the path as necessary

// Array of possible responses
const responses = ["👋 Hello!", "Hi there!", "Hey!", "Greetings!", "Hello, how can I assist you?"];

// Array of recipient IDs
const recipientIds = ["6282125609413@c.us", "6285716690580@c.us", "628992490946@c.us", "6281215146102@c.us", "6281572697825@c.us", "628567350704@c.us"];

wa.create({
  sessionId: "COVID_HELPER",
  multiDevice: true,
  authTimeout: 60,
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: "PT_BR",
  logConsole: false,
  popup: true,
  qrTimeout: 0,
}).then((client) => start(client));

function start(client) {
  client.onMessage(async (message) => {
    if (message.body === "Hi") {
      // Randomly select a response
      const randomIndex = Math.floor(Math.random() * responses.length);
      const response = responses[randomIndex];

      // Send the randomly selected response
      await client.sendText(message.from, response);
    }
  });

  // Send a random quote every 1 minute to a randomly selected recipient
  setInterval(async () => {
    // Randomly select a recipient ID from the array
    const recipientIndex = Math.floor(Math.random() * recipientIds.length);
    const recipientId = recipientIds[recipientIndex];

    // Randomly select a quote from the array
    const quoteIndex = Math.floor(Math.random() * localQuotes.length);
    const quote = localQuotes[quoteIndex];
    const message = `"${quote.text}" - ${quote.author}`; // Format the message

    await client.sendText(recipientId, message);
    console.log(`Message sent to ${recipientId}: ${message}`);
  }, 60000); // 60000 milliseconds = 1 minute
}

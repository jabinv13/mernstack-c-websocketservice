import logger from "./src/config/logger";
import { createMessageBroker } from "./src/factories/broker-factory";
import { MessageBroker } from "./src/types/broker";
import ws from "./src/socket";
import config from "config";

const PORT = config.get("server.port");

const startServer = async () => {
  let broker: MessageBroker | null = null;
  try {
    broker = createMessageBroker();
    await broker.connectConsumer();
    await broker.consumeMessage(["order"], false);

    ws.wsServer
      .listen(PORT, () => {
        console.log(`Listening on port${PORT}`);
      })
      .on("error", (err) => {
        console.log("err", err.message);
        process.exit();
      });
  } catch (err) {
    logger.error("Error happened: ", err.message);
    if (broker) {
      await broker.disconnectConsumer();
    }
    process.exit(1);
  }
};

void startServer();

import { server } from "./app.js";

// TODO: Import from env
const port = 3000;

server.listen(port, () => onListening());

function onListening() {
  console.log(`App listening to port: ${port}`);
}

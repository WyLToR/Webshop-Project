import app from './app';
import { PORT } from './constants/constants';
import client from './db/db';
import initDb from './db/db-init';

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} PORT!`);
});

client.connect().catch((err) => {
  console.log(err);
  process.exit(1);
});

initDb().catch((err) => {
  console.log('DB init failed:', err);
  process.exit(1);
});

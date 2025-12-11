import app from './scr/app.js';

const PORT = process.env.PORT || 3000;
import { connectDb } from './scr/db/db.js';
connectDb();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

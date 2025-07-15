import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from "./routes/auth.routes.js";

app.get('/', (req, res) => {
    res.json({ message: "Welcome to flavour-verse server!" });
});

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
   console.log('Listening on port 3000');
});
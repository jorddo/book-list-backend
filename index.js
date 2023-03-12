import dotenv from 'dotenv';
import { default as cors, default as express } from 'express';
import supabase from './src/lib/supabase.js';

// load in environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const corsOptions = {
  origin: '*',
  methods: 'GET,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
};

// get all books
app.get('/api/userBooks', cors(corsOptions), async (req, res) => {
  const { data, error } = await supabase.from('userBooks').select('*');

  if (error) return res.status(400).json({ message: 'Error getting books' });

  if (data) return res.json(data);
});

app.listen(port, () => {
  console.log('Express books is now running on my butthole.');
});

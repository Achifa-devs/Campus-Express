const { express,morgan,cors} = require('./modules');
const cookieParser = require('cookie-parser');
const greetingTime = require("greeting-time");
const { payment_route } = require('./route');
greetingTime(new Date());
require('dotenv').config(); 

const app = express(); 
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev')); 

app.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'UPDATE'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(payment_route)

app.listen(process.env.PORT,() => console.log('app is live @',process.env.PORT));








process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  promise.then((result => console.log(result))).catch(err => console.log(err))
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
});

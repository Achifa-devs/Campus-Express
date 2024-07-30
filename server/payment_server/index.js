const { express,path,fs,parser,mocha,morgan,cors,shortId,jwt,io} = require('./modules');
const {NeonDB} = require('./db');
const cookieParser = require('cookie-parser');
const greetingTime = require("greeting-time");
const { v4 } = require('uuid');
const { payment_route } = require('./route');
greetingTime(new Date());
require('dotenv').config(); 

const app = express(); 
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev')); 

let urls = ['http://localhost:3000', 'http://192.168.0.2:3000', 'https://campus-excpress-website-6fwkxq5ma-achifa.vercel.app'];

app.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'UPDATE'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(payment_route)

var server = app.listen(process.env.PORT,_ => console.log('app is live @',process.env.PORT));
io(server, {cors: {origin: '*'}}).on('connection', socket => {


});
 











process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
});

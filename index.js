import dBConfig from './utils/dbConfig';
import path from 'path';
import cors from 'cors';
import routes from './app/routes';
import  bodyParser from 'body-parser';
import express from 'express';
import jsend from 'jsend';
import swaggerUi  from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(bodyParser.json());
app.use(jsend.middleware);

app.use('/phone-number-generator/api', routes)

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

const port = process.env.PORT || dBConfig.port || 3005;

const server = app.listen(port, function() {
  console.log('app running on', server.address().port);
});

module.exports = server
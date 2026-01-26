import bodyParser from 'body-parser';
export const parser = bodyParser.json({
  limit: '1024mb'
});
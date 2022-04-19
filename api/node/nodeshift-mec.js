const axios = require('axios').default;
const fastify = require('fastify')({ logger: false });

let options;

exports.init = async (opts) => {
  options = opts;
  console.log('Nodeshift MEC init');
  const start = async () => {
    try {
      await fastify.listen(options.port, '0.0.0.0')
    } catch (err) {
      fastify.log.error(err)
      console.log(err);
      process.exit(1)
    }
  };
  start();
};

const subscriptions = new Map();

exports.subscribe_cell_changed = (callback) => {
  subscriptions.set('cell_changed', callback);
  axios.post('http://localhost:3000/rni/v1/subscriptions/cell_changed', {
    callbackReference: `http://127.0.0.1:${options.port}/cell_changed_notification`,
    appInsId: '1234',
  }).then(function (response) {
    return response.data;
  }).catch(function (error) {
    return error;
  });
}

fastify.post('/cell_changed_notification', async (request, reply) => {
  subscriptions.get('cell_changed')(request.body);
  return { }
});



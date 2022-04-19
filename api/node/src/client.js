const axios = require('axios').default;
const fastify = require('fastify')({ logger: false });

/* This client example is intended to simulate a MEC subscription register
 * for cell_changed events. The purpose is to understand how one goes about
 * to implement the callback reference.
 */

fastify.post('/cell_changed_notification', async (request, reply) => {
  console.log('cell_changed notification');
  console.log(request.body);
  setImmediate(() => {
    process.exit(1);
  });
  return { status: 'processed notification' }
});

let port;
const start = async () => {
  try {
    await fastify.listen(0, '0.0.0.0')
    port = fastify.server.address().port;
    create_subscription(port);
  } catch (err) {
    fastify.log.error(err)
    console.log(err);
    process.exit(1)
  }
};
start();

function create_subscription(port) {
  axios.post('http://localhost:3000/rni/v1/subscriptions/cell_changed', {
    callbackReference: `http://127.0.0.1:${port}/cell_changed_notification`,
    appInsId: '1234',
  }).then(function (response) {
      //console.log(response.data);
  }).catch(function (error) {
      console.log(error);
  });
}

const fastify = require('fastify')({ logger: false });
const axios = require('axios').default;

const subscribers = new Map();

console.log('Services:');
fastify.addHook('onRoute', (routeOptions) => {
  console.log(`URL: ${routeOptions.url}`);
})

fastify.post('/rni/v1/subscriptions/cell_changed', async (request, reply) => {
  console.log('cell_changed subscription request');
  console.log(request.body.appInsId, request.body.callbackReference);
  subscribers.set(request.body.appInsId, request.body.callbackReference);
  return {};
});

const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
};
start();

function send_notifications() {
  for (const [appInsId, callback_ref] of subscribers) {
    console.log(`Processing appInsId: ${appInsId}, url: ${callback_ref}`);
    axios.post(callback_ref, {
      timeStamp: new Date().getTime(),
      associateId: undefined,
      srcEcgi: { // E-UTRAN Cell Global Identifier of the source cell.
        mcc: 's-123', // Mobile Country Code. Part of Public Land Mobile Network (PLMN).
        mnc: 's-456', // Mobile Network Code. Part of PLMN.
        cellId: '999', // Cell Identity
      },
      trgEcgi: { // E-UTRAN Cell Global Identifier of the target cell.
        mcc: 't-123', // Mobile Country Code. Part of Public Land Mobile Network (PLMN).
        mnc: 't-456', // Mobile Network Code. Part of PLMN.
        cellId: '999', // Cell Identity
      },
      hoStatus: 3, // Handover status.
      tempUeId: {
        mmec: '1', // ??
        mtmsi: '1', // ??
      }
    }).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.log(error);
    });

    subscribers.delete(appInsId);
  }
}

setInterval(send_notifications, 5000);

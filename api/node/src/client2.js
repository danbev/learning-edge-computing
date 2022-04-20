const {mec, rnis} = require('./nodeshift-mec.js');

mec.init({port: 7777});

rnis.subscribe_cell_changed(process_cell_changed);

function process_cell_changed(body) {
  console.log('cell_changed notification');
  console.log(body);
  setImmediate(() => {
    process.exit(1);
  });
}

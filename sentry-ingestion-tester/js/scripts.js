function getDsn() {
  if (typeof Sentry === 'undefined') {
    console.warn('Sentry SDK is not loaded, you may need to turn off adblockers.');
    return;
  }

  const nextDsn = document.getElementById('dsn-input').value;

  if (!nextDsn) {
    console.warn('Please enter a Sentry DSN into the input box.');
    return undefined;
  }

  return nextDsn
}

function updateSentryDsn() {
  const nextDsn = getDsn();
  if (!nextDsn) {
    return;
  }

  Sentry.init({
    dsn: nextDsn,
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 1,
  });

  console.log(`Updated DSN to ${nextDsn}`);
}

function sendEvents(quantity = 1, dataType) {
  const method = dataType == 'errors'
    ? sendError
    : dataType == 'transactions'
      ? sendTransaction
      : undefined;

  if (!method) {
    return;
  }

  function sendEventsLoop() {
    setTimeout(() => {
      count += 1;
      method(`${count}/${quantity}`);

      if (count < quantity) {
        sendEventsLoop();
      }
    }, 200);
  }

  let count = 0;
  sendEventsLoop();
}


function sendError(count = '1/1', dsn = getDsn()) {
  if (!dsn) {
    return;
  }

  const timeString = getTimeString();
  const errorName = `JS Ingestion Test: ${timeString}`;
  const error = new Error(errorName)

  Sentry.captureException(error);

  console.log(`${count} error: "${errorName}"`)
}


function sendTransaction(count = '1/1', dsn = getDsn()) {
  if (!dsn) {
    return;
  }

  const timeString = getTimeString();
  const transactionName = `JS Ingestion Test: ${timeString}`;

  const transaction = Sentry.startTransaction({name: transactionName});
  const span = transaction.startChild({
    op: 'function',
    description: `${timeString}`,
  });

  span.finish(); // Only finished spans will be sent with the transaction
  transaction.finish(); // Only finished transactions will be sent to Sentry

  console.log(`${count} transaction: "${transactionName}"`)
}


function getTimeString() {
  const date = new Date();
  const currentHour = ("0" +  date.getHours()).slice(-2);
  const currentMinute = ("0" +  date.getMinutes()).slice(-2);
  return `${currentHour}:${currentMinute}`;
}


updateSentryDsn()

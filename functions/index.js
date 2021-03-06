const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

function addNotificationToDb(plant) {
  db.collection('notifications')
    .doc()
    .set(JSON.parse(JSON.stringify(plant)));
}

function addNotification(message, token) {
  const notificationMessage = {
    notification: {
      title: 'Time to water your plants ',
      body: message,
    },
    webpush: {
      notification: {
        requireInteraction: true,
        icon: '/icons/notification.png',
      },
      fcmOptions: {
        link: 'https://water-your-plants-sigma.vercel.app/',
      },
    },
    token: token,
  };
  // Send a message to the device corresponding to the provided
  // registration token.
  admin
    .messaging()
    .send(notificationMessage)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
}

exports.deleteNotificationsCollection = functions.pubsub
  .schedule('every day 00:00')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    db.collection('notifications')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((snapshot) => {
          snapshot.ref.delete();
        });
      });
    return null;
  });

/*exports.dummy1 = functions.pubsub
  .schedule('every 2 minutes')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will be run every 2nd minute');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '1');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
              addNotificationToDb(plant.data());
            });
            if (message !== '') {
              addNotification(message, registrationToken);
            }
          });
        });
      });

    return null;
  });*/

exports.everyDay = functions.pubsub
  .schedule('every day 09:00')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will be run every day at 9');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;
          const userId = user.data().uid;

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '1');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
              addNotificationToDb(plant.data());
            });
            addNotification(message, registrationToken);
          });
        });
      });

    return null;
  });

exports.everySecondDay = functions.pubsub
  .schedule('0 09 */2 * *')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will be run every second day at 9');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '2');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
              addNotificationToDb(plant.data());
            });

            addNotification(message, registrationToken);
          });
        });
      });

    return null;
  });

exports.everyThirdDay = functions.pubsub
  .schedule('0 09 */3 * *')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will run every third day at 9');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '3');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
              addNotificationToDb(plant.data());
            });

            addNotification(message, registrationToken);
          });
        });
      });

    return null;
  });

exports.everyFourthDay = functions.pubsub
  .schedule('0 09 */4 * *')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will run every fourth day at 9');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;
          console.log(registrationToken);

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '4');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
              addNotificationToDb(plant.data());
            });

            addNotification(message, registrationToken);
          });
        });
      });

    return null;
  });

exports.everyWeek = functions.pubsub
  .schedule('every monday 09:00')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will run every monday day at 9');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '7');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
              addNotificationToDb(plant.data());
            });

            addNotification(message, registrationToken);
          });
        });
      });

    return null;
  });

exports.everyTenthDay = functions.pubsub
  .schedule('1, 10, 20, 30 of month 09:00')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will run every tenth day at 9');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '10');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
              addNotificationToDb(plant.data());
            });

            addNotification(message, registrationToken);
          });
        });
      });

    return null;
  });

exports.everySecondWeek = functions.pubsub
  .schedule('1st, 3rd monday of month 09:00')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will run every second monday day at 9');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '14');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
              addNotificationToDb(plant.data());
            });

            addNotification(message, registrationToken);
          });
        });
      });
    return null;
  });

exports.everyMonth = functions.pubsub
  .schedule('1st monday of month 09:00')
  .timeZone('Europe/Stockholm')
  .onRun((context) => {
    console.log('This will run every 1st monday of month at 9');

    db.collection('users')
      .get()
      .then((snapShot) => {
        snapShot.forEach((user) => {
          console.log(user.data().email);
          const registrationToken = user.data().token;

          const data = db
            .collection('plants')
            .where('userId', '==', user.data().uid)
            .where('interval', '==', '30');
          data.get().then((snapShot) => {
            let message = '';

            snapShot.forEach((plant) => {
              message += plant.data().name + ', ';
              addNotificationToDb(plant.data());
            });

            addNotification(message, registrationToken);
          });
        });
      });

    return null;
  });

exports.createUserDocument = functions.auth.user().onCreate((user) => {
  console.log(user);
  db.collection('users')
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(user)));
});

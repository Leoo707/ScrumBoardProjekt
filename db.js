var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('scrum-board.db');

function createTable() {
  // db.run('drop table if exists cards');
  db.run(
    'CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY, title TEXT, position INTEGER, category TEXT, color TEXT, report TEXT, details TEXT, file BLOB)'
  );
}

async function addCard(card) {
  let exists = false;
  promise = await cardExists(card.id).then((result) => {
    exists = result;
  });
  console.log(exists);
  if (exists) {
    //updateCard
    console.log('card exists, we have to update!');
    updateCard(
      card.id,
      card.title,
      card.category,
      card.color,
      card.report,
      card.details,
      card.file
    );
  } else {
    //newCard
    db.run(`INSERT into cards (id, title, position, category, color, report, details, file)
                VALUES (${card.id}, \'${card.title}\', ${card.position}, '${card.category}', '${card.color}', '${card.report}', '${card.details}', ${card.file})`);
  }
}

async function getAllCards() {
  let cards = null;
  promise = await selectAll().then((rows) => {
    cards = rows;
  });
  console.log(cards)
  return cards;
}

async function getData(id, title, category, color, report, details, file) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      console.log('SELECT * FROM cards' + id);
       let updateQuery = `SELECT   
                        title='${title}',
                        category='${category}',
                        color='${color}',
                        report='${report}',
                        details='${details}',
                        file='${file}' 
                        FROM cards WHERE id=${id}`;
        db.run(updateQuery, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    })
  })
}

async function selectAll() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all('SELECT * FROM cards', (err, rows) => {
        resolve(rows)
      });
      
    })
  });
}

async function cardExists(id) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      console.log('SELECT * FROM cards WHERE id=' + id);
      db.all('SELECT * FROM cards WHERE id=' + id, (err, rows) => {
        if (rows.length > 0) resolve(true);
        resolve(false);
      });
    });
  });
}

async function deleteCardContent(id) {
    db.serialize(() => {
      console.log('DELETE FROM cards WHERE id=' + id.id);
      db.all('DELETE FROM cards WHERE id=' + id.id, (err) => {
        ;
      });
    });
}


async function updateCard(id, title, category, color, report, details, file) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let updateQuery = `UPDATE cards SET 
                        title='${title}',
                        category='${category}',
                        color='${color}',
                        report='${report}',
                        details='${details}',
                        file='${file}' 
                        WHERE id=${id}`;
      db.run(updateQuery, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

module.exports = {
  createTable,
  addCard,
  getAllCards,
  deleteCardContent
};

const sqlite3 = require('sqlite3').verbose();

function getConnection() {
  const dbPath = './public/db/local.db'
  
  // open database
  return new sqlite3.Database(dbPath, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to SQlite database.' + dbPath);
  });
}

function closeConnection(db) {
  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}

module.exports.insertPessoa = function (pessoa) {
  const sql = 'INSERT INTO PES_PESSOA (PES_NOME, PES_IDADE) VALUES (?, ?)'

  const db = getConnection();

  // insert one row into the langs table
  db.run(sql, [pessoa.nome, pessoa.idade], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });

  closeConnection(db);
}

module.exports.selectAllPessoa = function () {
  return new Promise((resolve, reject) => {
    const db = getConnection();
  
    db.serialize(() => {
      const sql = "SELECT PES_ID, PES_NOME, PES_IDADE, PES_OBSERVACAO FROM PES_PESSOA"

      db.all(sql, (err, rows) => {
        if (err) {
          console.error(err.message);
        }

        //console.log(row.PES_ID + "\t" + row.PES_NOME + "\t" + row.PES_IDADE + "\t" + row.PES_OBSERVACAO);
        resolve(rows)
        closeConnection(db)
      });
    });

    // TODO: Tratar erro
  })
}

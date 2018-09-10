const mysql = require('mysql');
const connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : '',
database : 'biz'
});

connection.connect();

const end = function end(){
  connection.end();
};


const test = function test(){
  const sql = 'SELECT "vanessa" AS prenom';

  connection.query(sql, function(error, results, fields){
    if (error) throw error;
    console.log(results);
    console.log(results[0]);
    console.log(results[0].prenom);
  });
};

const getProducts = function getProducts(id, clbk){
  var sql;

  if (id){
    sql = "SELECT * FROM article WHERE id = ?";
  }else {
    sql = "SELECT * FROM article";
  }

  connection.query(sql, [id], function(error, results, fields){
    if (error) throw error;
    clbk(results);

  });
};

const createProducts = (clbk,data) =>{
    const q = "INSERT INTO article (nom,prix,description) VALUES (?,?,?)";
    const payload = [data.nom, data.prix, data.description];
    connection.query(q, payload, (err, res, cols) => {
        if (err) throw err;
        return clbk(res);
    });
};


module.exports = {
  test : test,
  createProducts : createProducts,
  getProducts : getProducts,
  end
};

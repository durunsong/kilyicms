var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
});

connection.connect();
//  添加
var addSql = 'INSERT INTO user(name, account, password, role, token, create_time, is_delete) VALUES(?, ?, ?, ?, ?, ?, ?)';
var addSqlParams = ['菜鸟移76', 'sasdfdaj1132', '8287er4', '3', '', '2023-12-19 18:52:12', '0'];

connection.query(addSql, addSqlParams, function (err, result) {
  if (err) {
    console.log('[INSERT ERROR] - ', err.message);
    return;
  }        

  console.log('--------------------------INSERT----------------------------');
  console.log('INSERT ID:', result.insertId);        
  console.log('-----------------------------------------------------------------\n\n');
});

// //  查询
// var sql = "SELECT * FROM user";
// connection.query(sql, function (err, result) {
    
//   if (err) {
//     console.log("[SELECT ERROR] - ", err.message);
//     return;
//   }
//   console.log("----------------------------SELECT----------------------------");
//   console.log(result);
//   console.log("------------------------------------------------------------\n\n");
// })
// //  修改
// var modSql = 'UPDATE user SET name = ?, account = ?, password = ? WHERE id = ?';
// var modSqlParams = ['菜鸟移222', 'sandj113222', '82873dds', 1];
// //改
// connection.query(modSql,modSqlParams,function (err, result) {
//    if(err){
//          console.log('[UPDATE ERROR] - ',err.message);
//          return;
//    }        
//   console.log('--------------------------UPDATE----------------------------');
//   console.log('UPDATE affectedRows',result.affectedRows);
//   console.log('-----------------------------------------------------------------\n\n');
// });

// //  删除
// var delSql = 'DELETE FROM user where id = ?';
// var delSqlParams = [1];
// connection.query(delSql,delSqlParams,function (err, result) {
//     if(err){
//           console.log('[DELETE ERROR] - ',err.message);
//           return;
//     }        
//    console.log('--------------------------DELETE----------------------------');
//    console.log('DELETE affectedRows',result.affectedRows);
//    console.log('-----------------------------------------------------------------\n\n');
// })
 
connection.end();
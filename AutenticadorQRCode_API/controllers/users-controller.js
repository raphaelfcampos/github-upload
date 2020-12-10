const mysql = require("../mysql").pool;

exports.SignIn = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      console.log(error)
      return res.status(500).send({ error: error });
    }
    const query = `SELECT login,email,DATE_FORMAT(dt_ultimologin, "%Y-%m-%d %T") as dt_ultimologin,cd_pessoa FROM qr_login WHERE login = ? AND senha = ?`;

    conn.query(query,[req.body.login, req.body.senha], (error, results, fields) => {
        conn.release();
        if (error) {
          console.log(error)
          return res.status(500).send({ error: error });
        }

        if (results.length < 1) {
          return res.status(401).send({ mensagem: "Usuário ou senha inválidos." });
        } else {

          atualizarDtUltimoLogin(req.body.login).then((atualizouUltimoLogin) => {
            if (atualizouUltimoLogin) {
              //console.log('Data do ultimo login atualizada')
            }
          })

          return res.status(201).send({
            usuario: results[0],
            mensagem: "Autenticado com sucesso",
          });
        }
      }
    );
  });
};


exports.SignOut = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      console.log(error)
      return res.status(500).send({ error: error });
    }
    const query = `UPDATE qr_sessao SET dthr_saida = ? WHERE id_login = ? and token = ?`;

    conn.query(query,[new Date(),req.body.login, req.body.token], (error, results, fields) => {
        conn.release();
        if (error) {
          console.log(error)
          return res.status(500).send({ error: error });
        }

        if (results.affectedRows < 1) {
          return res.status(400).send({ mensagem: "Não foi possível realizar o logout" });
        } else {          
          return res.status(201).send({
            mensagem: "Logout realizado com sucesso",
          });
        }
      }
    );
  });
};


exports.CreateSession = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      console.log(error)
      return res.status(500).send({ error: error });
    }

    const query = `INSERT INTO qr_sessao (id_login, token, dthr_inicio) VALUES (?,?,?)`;

    conn.query(query,[req.body.id_login, req.body.token, new Date()], (error, results, fields) => {
        conn.release();
        if (error) {
          console.log(error)
          return res.status(500).send({ error: error });
        }

        if (results.affectedRows < 1) {
          return res.status(400).send({ mensagem: "Não foi possível iniciar a sessão." });
        } else {          
          return res.status(201).send({
            mensagem: "Sessão criada com sucesso.",
          });
        }
      }
    );
  });
};


exports.SessionValidation = (req, res, next) => {
  const token = req.headers['x-token']

  mysql.getConnection((error, conn) => {
    if (error) {
      console.log(error)
      return res.status(500).send({ error: error });
    }

    const query = `SELECT l.login,l.email
    FROM qr_sessao s
    INNER JOIN qr_login l ON l.login = s.id_login
    WHERE s.token = ? and s.dthr_saida IS NULL`;

    conn.query(query,[token], (error, results, fields) => {
        conn.release();
        if (error) {
          console.log(error)
          return res.status(500).send({ error: error });
        }

        if (results.length >= 1) {
          return res.status(200).send({
            user: {
              login: results[0].login,
              email: results[0].email
            },
            mensagem: "true"
          });
        } else {          
          return res.status(209).send({ mensagem: "false" });
        }
      }
    );
  });
}


const atualizarDtUltimoLogin = (login) => {
  return new Promise((resolve,reject) => {
    const query = `UPDATE qr_login SET dt_ultimologin = ? WHERE login = ?`
    mysql.query(query, [new Date(), login], (error, results, fields) => {
      if(results.affectedRows = 1) {
        resolve(true)
      } else {
        console.log(error)
        reject(new Error('nenhum registro encontrado'))
      }
    })
  })
}

/**
 * Yleiset muuttujat
 */
require("dotenv").config();
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  util = require("util"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  { jwtSecret } = require("./config/secret");

let urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for reading JSON

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

/**
 * YHTEYS
 */
const conn = require("./database/dbconnection"),
  url = require("url"),
  query = util.promisify(conn.query).bind(conn);

/* Serverin käynnistys */
let server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});

//DATAN LISÄYS
/**
 *  Uusi projekti: projektinn nimi ja user id
 */
app.post("/api/new/project/:name/:userID", (req, res) => {
  const project_name = req.params.name;
  const userID = req.params.userID;
  const sql = "INSERT INTO project(project_name, userID) VALUES (?, ?)";
  conn.query(sql, [project_name, userID], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

/**
 * Uusi lista: listan nimi ja projekti id
 */
app.post("/api/new/list/:name/:projectID", (req, res) => {
  const list_name = req.params.name;
  const projectID = req.params.projectID;
  const sql = "INSERT INTO list(list_name, projectID) VALUES (?, ?)";
  conn.query(sql, [list_name, projectID], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

/**
 * Uusi kortti: kortinn nimi ja listan id
 */
app.post("/api/new/card/:name/:listID", (req, res) => {
  const card_name = req.params.name;
  const listID = req.params.listID;
  const sql = "INSERT INTO card(card_name, listID) VALUES (?, ?)";
  conn.query(sql, [card_name, listID], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

//DATAN POISTO
/**
 * Poistaa projektin ID:n mukaan
 */
app.delete("/api/project/delete/:id", function (req, res) {
  console.log("data: %j", req.params);
  const projectID = req.params.id;
  const sql = "DELETE FROM project WHERE projectID = ?";
  (async () => {
    try {
      await query(sql, [projectID]);
      res.status(200).send("DELETE succesful");
    } catch (e) {
      res.status(400).send("DELETE was not succesful " + e);
    }
  })();
});

/**
 * Poistaa listan ID:n mukaan
 */
app.delete("/api/list/delete/:id", function (req, res) {
  const listID = req.params.id;
  const sql = "DELETE FROM list WHERE listID = ?";
  (async () => {
    try {
      await query(sql, [listID]);
      res.status(200).send("DELETE succesful");
    } catch (e) {
      res.status(400).send("DELETE was not succesful " + e);
    }
  })();
});

/**
 * Poistaa kortin ID:n mukaan
 */
app.delete("/api/card/delete/:id", function (req, res) {
  const cardID = req.params.id;
  const sql = "DELETE FROM card WHERE cardID = ?";
  (async () => {
    try {
      await query(sql, [cardID]);
      res.status(200).send("DELETE succesful");
    } catch (e) {
      res.status(400).send("DELETE was not succesful " + e);
    }
  })();
});

// DATAN HAKU
/**
 * Projektit testausta varten
 */
/*
app.get("/api/get/project", function (req, res) {
  const sql = "SELECT * FROM project";
  conn.query(sql, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});
*/

/**
 * Projektit user idn mukaan
 */
app.get("/api/get/project/:id", (req, res) => {
  const userID = req.params.id;
  const sql = "SELECT * FROM project WHERE userID = ?";
  conn.query(sql, [userID], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

/**
 * Listat testausta varten
 */
/* app.get("/api/get/lists", function (req, res) {
  const sql = "SELECT * FROM list";
  conn.query(sql, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
}); */

/**
 * Listat projektin ID:n mukaan
 */
app.get("/api/get/lists/:id", function (req, res) {
  const projectID = req.params.id;
  const sql = "SELECT * FROM list WHERE projectID = ?";
  conn.query(sql, [projectID], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

/**
 * Kortit testausta varten
 */
/* app.get("/api/get/cards", function (req, res) {
  const sql = "SELECT * FROM card";
  conn.query(sql, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
}); */

/**
 * Kortit listan ID:n mukaan
 */
app.get("/api/get/cards/:id", function (req, res) {
  const listID = req.params.id;
  const sql = "SELECT * FROM card WHERE listID = ?";
  conn.query(sql, [listID], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

/**
 * Projektin nimen vaihto
 */
app.put("/api/editProject/:id/:name", function (req, res, next) {
  const projectID = req.params.id;
  const project_name = req.params.name;
  const sql = "UPDATE project SET project_name=? WHERE projectID=?";
  conn.query(sql, [project_name, projectID], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

/**
 * Projektin nimi id:llä
 */
app.get("/api/get/projectName/:id", function (req, res) {
  const projectID = req.params.id;
  const sql = "SELECT * FROM project WHERE projectID = ?";
  conn.query(sql, [projectID], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

/**
 * Listan nimen vaihto
 */
app.put("/api/editList/:id/:name", function (req, res, next) {
  const listID = req.params.id;
  const list_name = req.params.name;
  const sql = "UPDATE list SET list_name=? WHERE listID=?";
  conn.query(sql, [list_name, listID], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

/**
 * Listan nimi id:llä
 */
app.get("/api/get/listName/:id", function (req, res) {
  const listID = req.params.id;
  const sql = "SELECT * FROM list WHERE listID = ?";
  conn.query(sql, [listID], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

/**
 * Kortin nimen vaihto
 */
app.put("/api/editCard/:id/:name", function (req, res, next) {
  const cardID = req.params.id;
  const card_name = req.params.name;
  const sql = "UPDATE card SET card_name=? WHERE cardID=?";
  conn.query(sql, [card_name, cardID], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

/**
 * Kortin nimi id:llä
 */
app.get("/api/get/cardName/:id", function (req, res) {
  const cardID = req.params.id;
  const sql = "SELECT * FROM card WHERE cardID = ?";
  conn.query(sql, [cardID], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

/**
 * API Käyttäjän tietojen lisäys tietokantaan
 */
app.post("/api/user/register", urlencodedParser, function (req, res) {
  console.log("body: %j", req.body);
  let jsonObj = req.body;

  bcrypt.hash(jsonObj.password, 10, (err, hash) => {
    jsonObj.password = hash;
  });
  const checkUsername = "SELECT username FROM user WHERE username = ?";
  const sql = "INSERT INTO user (username, password)" + " VALUES (?, ?)";
  (async () => {
    // IIFE (Immediately Invoked Function Expression)
    try {
      const response = await query(checkUsername, [jsonObj.username]);
      if (response !== 0) {
        try {
          await query(sql, [jsonObj.username, jsonObj.password]);
          res.status(200).send("POST succesful " + req.body);
        } catch (err) {
          console.log("Insertion into a table was unsuccessful!" + err);
          res.status(400).send("POST was not succesful " + err);
        }
      } else {
        console.log("This username is already used");
      }
    } catch (err) {
      console.log("Insertion into a table was unsuccessful!" + err);
      res.status(400).send("POST was not succesful " + err);
    }
  })();
});

/**
 * API hae käyttäjänimen id
 */
app.get("/api/getUserID/:name", function (req, res) {
  const name = req.params.name;
  const sql = "SELECT userID FROM user WHERE username = ?";
  conn.query(sql, [name], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      console.log("resutlt JSON: " + JSON.stringify(result));
      console.log("result: " + result);
      res.send(result);
    }
  });
});

/**
 * API käyttäjän sisäänkirjautuminen, tokenin luonti ja lisäys localStorage
 */
app.post("/api/user/login", urlencodedParser, function (req, res) {
  console.log("body: %j", req.body);
  let jsonObj = req.body;
  const username = "SELECT * FROM user WHERE username = ?";
  (async () => {
    // IIFE (Immediately Invoked Function Expression)
    try {
      const user = await query(username, [jsonObj.username]);
      if (user.length !== 0) {
        try {
          const comparison = await bcrypt.compare(
            jsonObj.password,
            user[0].password
          );
          if (comparison) {
            const accessToken = jwt.sign(
              { name: user[0].username },
              jwtSecret,
              { expiresIn: "1h" }
            );
            res.status(202).json({ accessToken: accessToken });
            return;
          }
        } catch (err) {
          console.log("Selection from a table was unsuccessful!" + err);
          res.status(400).send("POST was not succesful " + err);
        }
      } else {
        console.log("False credentials");
      }
    } catch (err) {
      console.log("Insertion into a table was unsuccessful!" + err);
      res.status(400).send("POST was not succesful " + err);
    }
  })();
});

/**
 * API tokenin vahvistus
 */
app.post(
  "/api/user/verify",
  authenticateToken,
  urlencodedParser,
  function (req, res) {
    (async () => {
      // IIFE (Immediately Invoked Function Expression)
      try {
        res.status(200).send("POST succesful " + req.body);
      } catch (err) {
        res.status(400).send("POST was not succesful " + err);
      }
    })();
  }
);

/**
 *  Tokenin tarkistus
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token: " + token);

  if (token == null) return res.sendStatus(401);

  const verification = jwt.verify(token, process.env.JWT_SECRET);

  if (verification) {
    console.log("user (decoded) " + JSON.stringify(verification));
    next();
  } else {
    res.status(401);
  }
}

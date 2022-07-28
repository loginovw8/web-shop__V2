const express = require('express')
const mysql = require('mysql');
const path = require('path')
const session = require('express-session');
const { query } = require('express');
const app = express();
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "./public/img/" });


// Соединение с базой данных
const connection = mysql.createConnection({
  host: "127.0.0.1",
  database: "tovar",
  user: "root",
  password: "parol"
});

connection.connect(function (err) { if (err) throw err; });

// Путь к директории файлов ресурсов (css, js, images)
app.use(express.static('public'))


// Настройка шаблонизатора
app.set('view engine', 'ejs')

// Путь к директории файлов отображения контента
app.set('views', path.join(__dirname, 'views'))

// Обработка POST-запросов из форм
app.use(express.urlencoded({ extended: true }))

// Инициализация сессии
app.use(session({ secret: "parol", resave: false, saveUninitialized: true }));

// Middleware
function isAuth(req, res, next) {
  if (req.session.auth) {
    next();
  } else {
    res.redirect('/');
  }
}
// Запуск веб-сервера по адресу http://localhost:3000
app.listen(3000)

/**
 * Маршруты
 */


app.get('/', (req, res) => {
  connection.query("SELECT * FROM items   ", (err, data, fields) => {
    if (err) throw err;

    res.render('home', {
      'items': data,
      auth: req.session.auth
    });
    
  });
})





app.get('/hat', (req, res) => {
  connection.query("SELECT * FROM items WHERE type='hat'   ", (err, data, fields) => {
    if (err) throw err;

    res.render('home', {
      'items': data,
      auth: req.session.auth
    });
  });
})

app.get('/cap', (req, res) => {
  connection.query("SELECT * FROM items WHERE type='cap'   ", (err, data, fields) => {
    if (err) throw err;

    res.render('home', {
      'items': data,
      auth: req.session.auth
    });
  });
})

app.get('/jacket', (req, res) => {
  connection.query("SELECT * FROM items WHERE type='jacket'   ", (err, data, fields) => {
    if (err) throw err;

    res.render('home', {
      'items': data,
      auth: req.session.auth
    });
  });
})

app.get('/t-shirt', (req, res) => {
  connection.query("SELECT * FROM items WHERE type='t-shirt'   ", (err, data, fields) => {
    if (err) throw err;

    res.render('home', {
      'items': data,
      auth: req.session.auth
    });
  });
})

app.get('/hoodi', (req, res) => {
  connection.query("SELECT * FROM items WHERE type='hoodi'   ", (err, data, fields) => {
    if (err) throw err;

    res.render('home', {
      'items': data,
      auth: req.session.auth
    });
  });
})

app.get('/pants', (req, res) => {
  connection.query("SELECT * FROM items WHERE type='psnts'   ", (err, data, fields) => {
    if (err) throw err;

    res.render('home', {
      'items': data,
      auth: req.session.auth
    });
  });
})


app.get('/jeans', (req, res) => {
  connection.query("SELECT * FROM items WHERE type='jeans'   ", (err, data, fields) => {
    if (err) throw err;

    res.render('home', {
      'items': data,
      auth: req.session.auth
    });
  });
})

app.get('/shorts', (req, res) => {
  connection.query("SELECT * FROM items WHERE type='shorts'   ", (err, data, fields) => {
    if (err) throw err;

    res.render('home', {
      'items': data,
      auth: req.session.auth
    });
  });
})

app.get('/cross', (req, res) => {
  connection.query("SELECT * FROM items WHERE type='cross'   ", (err, data, fields) => {
    if (err) throw err;

    res.render('home', {
      'items': data,
      auth: req.session.auth
    });
  });
})

app.get('/sneakers', (req, res) => {
  connection.query("SELECT * FROM items WHERE type='sneakers'   ", (err, data, fields) => {
    if (err) throw err;

    res.render('home', {
      'items': data,
      auth: req.session.auth
    });
  });
})

app.get('/sandals', (req, res) => {
  connection.query("SELECT * FROM items WHERE type='sandals'   ", (err, data, fields) => {
    if (err) throw err;

    res.render('home', {
      'items': data,
      auth: req.session.auth
    });
  });
})

























app.get('/items/:id', (req, res) => {
  connection.query("SELECT * FROM items WHERE id=?", [req.params.id],
    (err, data, fields) => {
      if (err) throw err;

      res.render('item', {
        item: data[0],
        auth: req.session.auth
      })
  });
})
app.get('/basket_items/:id', (req, res) => {
  connection.query("SELECT * FROM basket WHERE id=?", [req.params.id],
    (err, data, fields) => {
      if (err) throw err;

      res.render('basket_items', {
        'basket': data[0],
        auth: req.session.auth
      })
    });
})

app.get('/auth', (req, res) => {
  res.render('auth', {
    auth: req.session.auth
  });
});


app.get('/add', (req, res) => {
  res.render('add', {
    auth: req.session.auth
  });
})

app.get('/lock', isAuth, (req, res) => {
  res.render('lock', {
    auth: req.session.auth
  });
});

app.post('/store', (req, res) => {
  connection.query(
    "INSERT INTO items (title, description, price, gender, type, image) VALUES (?, ?, ?, ?, ?, ?)",
    [[req.body.title], [req.body.description], [req.body.price], [req.body.radio_gender], [req.body.radio_type],[req.body.image]], (err, data, fields) => {
      if (err) throw err;

      res.redirect('/')
    });
})


app.post('/delete', (req, res) => {
  connection.query(
    'DELETE FROM items WHERE id=?',
    [Number([req.body.id])], (err, data, fields) => {
      if (err) throw err;

      res.redirect('/')
    });
})

app.post('/update', (req, res) => {
  connection.query(
    'UPDATE items SET title=?, description=?, price=?, gender=?, type=?, image=? WHERE id=?',
    [[req.body.title], [req.body.description], [req.body.price], [req.body.radio_gender], [req.body.radio_type], [req.body.image], Number([[req.body.id]])], (err, data, fields) => {
      if (err) throw err;

      res.redirect('/')
    });
})


app.get('/basket' , (req, res) => {
  connection.query("SELECT * FROM basket", (err, data, fields) => {
    if (err) throw err;

    res.render('basket', {
      'basket': data, auth: req.session.auth
    });
  });
});


  

app.post('/buy', (req, res) => {
  
     connection.query(
    'INSERT INTO basket (title, description, price, image) SELECT title, description, price, image FROM items WHERE id = ?',
    [[req.body.id]], (err, data, fields) => {
      if (err) throw err;

      res.redirect('/')
    });
 
})

app.post('/del', (req, res) => {
  console.log(req.body.id)
  connection.query(
    'DELETE FROM basket WHERE id=?',
    [[req.body.id]], (err, data, fields) => {
      if (err) throw err;

      res.redirect('/basket')
    });
})

app.post('/register', (req, res) => {

  connection.query(
    "SELECT * FROM users WHERE name=?",
    [[req.body.name]], (err, data, fields) => {
      if (err) throw err;
      if (data.length == 0) {
        connection.query(
          "INSERT INTO users (name,mail, password) VALUES (?,?, ?)",
          [[req.body.name],[req.body.mail], [req.body.password]], (err, data, fields) => {
            if (err) throw err;

            req.session.auth = true;
            res.redirect('/');
          });

      }
      else {
        
        req.session.auth = false;
        res.redirect('/auth');
      }

    })


});




app.get('/logout', (req, res) => {
  req.session.auth = false;
  res.redirect('/')
});

app.post('/login', (req, res) => {
  connection.query(
    "SELECT * FROM users WHERE name=? AND mail=? AND password=?",
    [[req.body.name], [req.body.mail], [req.body.password]], (err, data, fields) => {
      if (err) throw err;
      if (data.length > 0) {
        req.session.auth = true;
        res.redirect('/')

      }
      else {
        req.session.auth = false;
        res.redirect('/auth');


      }
    });
});



app.post("/upload", upload.single("image"), (req, res) => {
  const tempPath = req.file.path;
  const targetPath = path.join(
    __dirname,
    "./public/img/" + req.file.originalname
  );

  fs.rename(tempPath, targetPath, (err) => {
    if (err) console.log(err);
    
    res.redirect('/');
  });
});






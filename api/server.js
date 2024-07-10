const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const app = express();
const path = require('path');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.static('effects'));
app.use(express.static('productimages'));
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Incomplete login data' });
  }

  try {
    // SQL query to get the user by email
    const loginQuery = 'SELECT password, status FROM user WHERE email = ?';
    const [rows] = await pool.execute(loginQuery, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = rows[0];

    if (user.status !== 'verified') {
      return res.status(401).json({ error: 'User not verified' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/discounts', async (req, res) => {
  try {
    const query = 'SELECT * FROM discounts';
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching discounts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/check_email', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  try {
    // SQL query to check if the email exists
    const checkEmailQuery = 'SELECT COUNT(*) as count FROM user WHERE email = ?';
    const [result] = await pool.execute(checkEmailQuery, [email]);

    if (result[0].count > 0) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/check_contact', async (req, res) => {
  const { contact } = req.body;

  if (!contact) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  try {
    // SQL query to check if the contact exists and retrieve additional information
    const checkContactQuery = 'SELECT * FROM user WHERE contact = ?';
    const [result] = await pool.execute(checkContactQuery, [contact]);

    if (result.length > 0) {
      const userInformation = {
        fname: result[0].fname,
        lname: result[0].lname,
        email: result[0].email,
        contact: result[0].contact,
        address: result[0].address,
        city: result[0].city,
      };

      res.json({ exists: true, userInformation });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/billing_information', async (req, res) => {
  const { firstName, lastName, emailAddress, phone, address, townCity, subtotalvalue, totalAmountvalue, productIds, orderDate } = req.body;

  if (!firstName || !lastName || !emailAddress || !phone || !address || !townCity || !productIds || productIds.length === 0 || !orderDate) {
    return res.status(400).json({ error: 'Incomplete billing information or missing products' });
  }

  try {
    const roleid = 3;
    // SQL query to insert billing information into the user table
    const insertQuery = 'INSERT INTO user (fname, lname, email, contact, address, city, roleid) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [userResult] = await pool.execute(insertQuery, [firstName, lastName, emailAddress, phone, address, townCity, roleid]);

    // Check if the insertion into user table was successful
    if (userResult.affectedRows === 1) {
      console.log('User information stored successfully');
      // Retrieve the generated userid
      const userid = userResult.insertId;

      // Insert order information into the order table
      const orderInsertQuery = 'INSERT INTO `order` (userid, subtotal, grandtotal, orderdate) VALUES (?, ?, ?, ?)';
      const [orderResult] = await pool.execute(orderInsertQuery, [userid, subtotalvalue, totalAmountvalue, orderDate]);

      // Check if the insertion into order table was successful
      if (orderResult.affectedRows === 1) {
        console.log('Order information stored successfully');
        // Retrieve the generated orderid
        const orderid = orderResult.insertId;

        // Insert each product ID into the orderitem table and update product status
        for (const productId of productIds) {
          const orderItemInsertQuery = 'INSERT INTO orderitem (orderid, productid) VALUES (?, ?)';
          await pool.execute(orderItemInsertQuery, [orderid, productId]);

          const updateProductStatusQuery = 'UPDATE products SET status = "out of stock" WHERE productid = ?';
          await pool.execute(updateProductStatusQuery, [productId]);
        }

        // Send confirmation email
        const mailOptions = {
          to: emailAddress,
          subject: 'Order Confirmation',
          html: `
            <p>Thank you for placing your order! Your order# is <strong>${orderid}</strong>.</p>
          `
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });

        console.log('Order and billing information stored successfully');
        return res.status(200).json({ message: 'Order and billing information stored successfully', orderId: orderid });
      } else {
        console.error('Error storing order information');
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      console.error('Error storing user information');
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error storing billing information:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/filterOptions', async (req, res) => {
  try {
    const sizesQuery = 'SELECT DISTINCT size FROM products';
    const brandsQuery = 'SELECT DISTINCT brand FROM products';
    const conditionsQuery = 'SELECT DISTINCT shoecondition FROM products';
    const productidQuery='SELECT productid FROM products'

    const [sizesRows] = await pool.query(sizesQuery);
    const [brandsRows] = await pool.query(brandsQuery);
    const [conditionsRows] = await pool.query(conditionsQuery);
    const [productidRows] = await pool.query(productidQuery);

    const filterOptions = {
      productids:productidRows.map((row) => row.productid),
      sizes: sizesRows.map((row) => row.size),
      brands: brandsRows.map((row) => row.brand),
      conditions: conditionsRows.map((row) => row.shoecondition),
    };

    console.log('Filter options:', filterOptions);
    res.json(filterOptions);
    console.log('Filter options fetched successfully');
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/products_list_mens', async (req, res) => {
  try {
    let query = `
      SELECT * 
      FROM products
      WHERE category = 'men'
    `;

    const [rows] = await pool.query(query);
    res.json(rows);
    console.log('Request handled successfully');
  } catch (error) {
    console.error('Error fetching product list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/products_list_womens', async (req, res) => {
  try {
    let query = `
      SELECT * 
      FROM products
      WHERE category = 'women'
    `;

    const [rows] = await pool.query(query);
    res.json(rows);
    console.log('Request handled successfully');
  } catch (error) {
    console.error('Error fetching product list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/product_details/:product_id', async (req, res) => {
  try {
    const product_id = req.params.product_id;
    const query = 'SELECT * FROM products WHERE productid = ?';
    const [rows] = await pool.query(query, [product_id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(rows[0]);
      console.log('Product details fetched successfully');
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/reviews/:product_id', async (req, res) => {
  try {
    const product_id = req.params.product_id;
    const query = 'SELECT email, text, rating FROM reviews WHERE productid = ?';
    const [rows] = await pool.query(query, [product_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No reviews found for the given product id' });
    }

    console.log('Reviews fetched successfully:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/search_products', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Missing search query' });
    }

    const searchQuery = `
      SELECT DISTINCT productname FROM products
      WHERE 
        productname LIKE ?;
    `;

    const [rows] = await pool.query(searchQuery, [`%${query}%`]);

    if (rows.length === 0) {
      res.json({ message: 'No products found for the given query' });
    } else {
      const productNames = rows.map((row) => row.productname);
      res.json(productNames);
      console.log('Search results fetched successfully');
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/find_products', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Missing search query' });
    }

    const searchQuery = `
      SELECT * FROM products
      WHERE 
        productname LIKE ?;
    `;
    console.log('SQL Query:', searchQuery);
    const [rows] = await pool.query(searchQuery, [`%${query}%`]);

    if (rows.length === 0) {
      res.json({ message: 'No products found for the given query' });
    } else {
      res.json(rows);
      console.log('Search results fetched successfully');
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/add_review', async (req, res) => {
  const { email, product_id, text, customerId, rating, date, orderId } = req.body;

  if (!email || !product_id || !text || !customerId || !rating || !date || !orderId) {
    return res.status(400).json({ error: 'Incomplete review data' });
  }

  try {
    // SQL query to check if the order exists in the 'orders' table
    const checkOrderQuery = 'SELECT COUNT(*) as count FROM `order` WHERE orderid = ?';
    const [orderCheckResult] = await pool.execute(checkOrderQuery, [orderId]);

    if (orderCheckResult[0].count === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // SQL query to insert review data into the 'reviews' table
    const insertQuery = 'INSERT INTO reviews (productid, text, customerid, rating, date, orderid, email) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await pool.execute(insertQuery, [product_id, text, customerId, rating, date, orderId, email]);

    // Check if the insertion was successful
    if (result.affectedRows === 1) {
      console.log('Review added successfully');
      res.json({ message: 'Review added successfully' });
    } else {
      console.error('Error adding review');
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/api/verify_otp', async (req, res) => {
  const { otp } = req.body;
  console.log(otp);
  try {
    
    const updateQuery = 'UPDATE user SET status = ? WHERE otp = ? ';
    const [result] = await pool.execute(updateQuery, ['verified', otp]);

    if (result.affectedRows === 1) {
      res.json({ message: 'Email verified successfully' });
    } else {
      res.status(400).json({ error: 'Invalid OTP or email already verified' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/order/grandTotal', async (req, res) => {
  const userEmail = req.query.email;
  console.log(userEmail);
  // Query to fetch grand totals
  const query = `
    SELECT grandtotal FROM \`order\` 
    WHERE userid IN (SELECT userid FROM user WHERE email = ?)
  `;

  try {
    // Execute the query
    const [results] = await pool.query(query, [userEmail]);

    if (results.length === 0) {
      return res.json([]); // Return an empty array if no grand totals found
    }

    // Extract grand totals from the results
    const grandTotals = results.map(result => result.grandtotal);
    
    // Return the grand totals array
    res.json(grandTotals);
  } catch (error) {
    console.error('Error fetching grand totals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nauman170462@gmail.com',
    pass: 'efcyyqcwvcblkahv'
  }
});
app.post('/api/usersignup', async (req, res) => {
  const { email, firstName, lastName, password, status, DOB, otp } = req.body;

  // Check if all required fields are present
  if (!email || !firstName || !lastName || !password || !status || !DOB || !otp) {
    return res.status(400).json({ error: 'Incomplete user data' });
  }

  try {
    const roleid = 3;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL query to insert user data into the 'users' table
    const insertQuery = 'INSERT INTO user (email, fname, lname, password, DOB, roleid, otp, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await pool.execute(insertQuery, [email, firstName, lastName, hashedPassword, DOB, roleid, otp, status]);

    // Check if the insertion was successful
    if (result.affectedRows === 1) {
      console.log('User registered successfully');
      
      // Define the email content with CID for the embedded image
      const emailContent = `
      <div style="font-family: Arial, sans-serif; color: black;">
        <div style="background-color: #f7f7f7; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto;">
        
          <h2 style="color: black; text-align: center;">Verify Your Email Address</h2>
          <p style="font-size: 18px; text-align: center; color: black;">Hello ${firstName} ${lastName},</p>
          <p style="font-size: 16px; text-align: center; color: black;">Please use the following One Time Password (OTP) to verify your email address:</p>
          <div style="text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; color: black;">${otp}</div>
         
          
        </div>
      </div>`;
      // Define the mail options, including the attachment
      const mailOptions = {
        to: email,
        subject: 'Verify Your Email Address',
        html: emailContent,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
      res.json({ message: 'User registered successfully' });
    } else {
      console.error('Error registering user');
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'nauman170462@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});
app.get('/api/products/:subcategory', async (req, res) => {
  try {
    const subcategory = req.params.subcategory;
    const query = 'SELECT * FROM products WHERE subcategory = ?';
    const [rows] = await pool.query(query, [subcategory]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'No products found for the given subcategory' });
    } else {
      res.json(rows);
      console.log('Category product fetched successfully');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get("/api/productEffects/:productId", async (req, res) => {
  try {
    console.log("Product effect API called!");
    const productId = req.params.productId;
    console.log("Product id is:", productId);

    const query = "SELECT effect FROM products WHERE productid = ?";
    const [rows] = await pool.query(query, [productId]);

    if (rows.length > 0) {
      res.send(rows[0].effect);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error("Error fetching product effects:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

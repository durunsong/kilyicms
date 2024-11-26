// 默认首页
const homePage = (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" href="/images/api.png" type="image/x-icon" />
      <title>kilyicms-server</title>
      <style>
        body {
          margin: 0;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f4f4f9;
        }
        h1 {
          font-size: 3rem;
          font-weight: bold;
          background: linear-gradient(45deg, #ff416c, #ff4b2b, #f0c27b, #4b1248);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
          animation: gradient 5s infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      </style>
    </head>
    <body>
      <h1>Welcome to the world of kilyicms API!</h1>
    </body>
    </html>
  `);
};

module.exports = {
  homePage,
};

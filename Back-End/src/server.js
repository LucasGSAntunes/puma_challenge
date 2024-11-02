const router = require('./routes/router')
const app = require('./app')
require('dotenv').config()

const PORT = process.env.PORT || 3001  
app.listen(PORT, () => {
    console.log(`Back-End server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
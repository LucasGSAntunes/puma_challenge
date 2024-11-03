const app = require('./app')

const PORT = process.env.PORT || 3001  
app.listen(PORT, () => {
    console.log(`Back-End server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
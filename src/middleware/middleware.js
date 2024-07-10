// middleware.js
const loggingMiddleware = (store) => (next) => (action) => {
    console.log('Action:', action);
    return next(action);
  };
  
  export default loggingMiddleware;
  
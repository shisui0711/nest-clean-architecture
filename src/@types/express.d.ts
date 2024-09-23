declare global {
  namespace Express {
    interface Request {
      user?: any; // Hoặc kiểu dữ liệu khác tùy vào yêu cầu
    }
  }
}

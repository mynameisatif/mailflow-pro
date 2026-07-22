export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Please login with Google first.",
    });
  }

  next();
}
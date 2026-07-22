export const getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }

  res.json({
    success: true,
    user: {
      name: req.user.profile.displayName,
      email: req.user.profile.emails[0].value,
      photo: req.user.profile.photos[0].value,
    },
  });
};
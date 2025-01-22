const employeeAuthorization = (req, res, next) => {
  const allowedRoles = ["admin", "employee"];
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res
      .status(403)
      .json({ error: "Access denied. Admins and Employees only." });
  }
  next();
};

module.exports = employeeAuthorization;

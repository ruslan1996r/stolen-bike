let isPolice = (req, res, next) => {
    if (req.body.role !== 'police') {
        return res.json({ message: "You do not have rights to this action" })
    }
    next()
};

module.exports = { isPolice };
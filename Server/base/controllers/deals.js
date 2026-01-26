const { getDeal, getDeals, updateDeal, createDeal, getRefunds } = require("../services/deals");


exports.getDealHandler =  async function (req, res) {
    try {
        const response = await getDeal(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.getDealsHandler =  async function (req, res) {
    try {
        const response = await getDeals(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.getRefundsHandler =  async function (req, res) {
    try {
        const response = await getRefunds(req.query);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message });
    }
}
exports.updateDealHandler =  async function (req, res) {
    try {
        const response = await updateDeal(req.body);
        res.status(201).json({ success: true, data: response});
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.createDealHandler =  async function (req, res) {
    try {
        const response = await createDeal(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message });
    }
}


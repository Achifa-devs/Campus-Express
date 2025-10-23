const { getDeal, getDeals, updateDeal, createDeal } = require("../services/deals");


exports.getDealHandler =  async function (req, res) {
    try {
        const respomse = await getDeal(req.query);
        res.status(201).json({ success: true, data: respomse });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.getDealsHandler =  async function (req, res) {
    try {
        const respomse = await getDeals(req.query);
        res.status(201).json({ success: true, data: respomse });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.updateDealHandler =  async function (req, res) {
    try {
        const response = await updateDeal(req.body);
        res.status(201).json({ success: true, data: response});
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

exports.createDealHandler =  async function (req, res) {
    try {
        const response = await createDeal(req.body);
        res.status(201).json({ success: true, data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


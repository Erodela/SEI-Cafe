const Item = require("../../models/Item");

module.exports = {
  index,
  show,
};

async function index(req, res) {
  try {
    const items = await Item.find({}).sort("name").populate("category").exec();
    //re-sort based upon the sortOrder of the categories
    items.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
    res.json(items);
  } catch (err) {
    res.json({ mes: err.message });
  }
}

async function show(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  } catch (err) {
    res.json({ msg: err.message });
  }
}

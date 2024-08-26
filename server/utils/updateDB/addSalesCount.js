const Product = require("../../models/product.model");

async function addSalesCountField() {
  try {
    const result = await Product.updateMany(
      { salesCount: { $exists: false } },
      { $set: { salesCount: 0 } }
    );
    console.log(`${result.nModified} documents were updated`);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = addSalesCountField;

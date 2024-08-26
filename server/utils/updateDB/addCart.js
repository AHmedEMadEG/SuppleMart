const User = require("../../models/user.model");

async function addCartField() {
  try {
    const result = await User.updateMany(
      { cart: { $exists: false } },
      { $set: { cart: [] } }
    );
    console.log(`${result.matchedCount} documents matched the criteria`);
    console.log(`${result.modifiedCount} documents were updated`);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = addCartField;

const admin = require("firebase-admin");
const db = admin.firestore();

class User {
  static async create(data) {
    return await db.collection("users").add(data);
  }

  static async getAll() {
    const users = [];
    const snapshot = await db.collection("users").get();
    snapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return users;
  }

  static async getById(userId) {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return null;
    }
    return {
      id: userDoc.id,
      ...userDoc.data(),
    };
  }

  static async update(userId, newData) {
    const userRef = db.collection("users").doc(userId);
    await userRef.update(newData);
  }

  static async delete(userId) {
    const userRef = db.collection("users").doc(userId);
    await userRef.delete();
  }
}

module.exports = User;

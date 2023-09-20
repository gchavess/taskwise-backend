const admin = require("firebase-admin");
const db = admin.firestore();

class Goal {
  static async create(data) {
    return await db.collection("goals").add(data);
  }

  static async getAll() {
    const goals = [];
    const snapshot = await db.collection("goals").get();
    snapshot.forEach((doc) => {
      goals.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return goals;
  }

  static async getById(goalId) {
    const goalRef = db.collection("goals").doc(goalId);
    const goalDoc = await goalRef.get();
    if (!goalDoc.exists) {
      return null;
    }
    return {
      id: goalDoc.id,
      ...goalDoc.data(),
    };
  }

  static async update(goalId, newData) {
    const goalRef = db.collection("goals").doc(goalId);
    await goalRef.update(newData);
  }

  static async delete(goalId) {
    const goalRef = db.collection("goals").doc(goalId);
    await goalRef.delete();
  }
}

module.exports = Goal;

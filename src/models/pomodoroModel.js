const admin = require("firebase-admin");
const db = admin.firestore();

class Pomodoro {
  static async create(data) {
    return await db.collection("pomodoros").add(data);
  }

  static async getAll() {
    const pomodoros = [];
    const snapshot = await db.collection("pomodoros").get();
    snapshot.forEach((doc) => {
      pomodoros.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return pomodoros;
  }

  static async getById(pomodoroId) {
    const pomodoroRef = db.collection("pomodoros").doc(pomodoroId);
    const pomodoroDoc = await pomodoroRef.get();
    if (!pomodoroDoc.exists) {
      return null;
    }
    return {
      id: pomodoroDoc.id,
      ...pomodoroDoc.data(),
    };
  }

  static async update(pomodoroId, newData) {
    const pomodoroRef = db.collection("pomodoros").doc(pomodoroId);
    await pomodoroRef.update(newData);
  }

  static async delete(pomodoroId) {
    const pomodoroRef = db.collection("pomodoros").doc(pomodoroId);
    await pomodoroRef.delete();
  }
}

module.exports = Pomodoro;

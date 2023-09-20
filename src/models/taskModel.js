const admin = require("firebase-admin");
const db = admin.firestore();

class Task {
  static async create(data) {
    return await db.collection("tasks").add(data);
  }

  static async getAll() {
    const tasks = [];
    const snapshot = await db.collection("tasks").get();
    snapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return tasks;
  }

  static async getById(taskId) {
    const taskRef = db.collection("tasks").doc(taskId);
    const taskDoc = await taskRef.get();
    if (!taskDoc.exists) {
      return null;
    }
    return {
      id: taskDoc.id,
      ...taskDoc.data(),
    };
  }

  static async update(taskId, newData) {
    const taskRef = db.collection("tasks").doc(taskId);
    await taskRef.update(newData);
  }

  static async delete(taskId) {
    const taskRef = db.collection("tasks").doc(taskId);
    await taskRef.delete();
  }
}

module.exports = Task;

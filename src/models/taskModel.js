const admin = require("firebase-admin");
const db = admin.firestore();

class Task {
  static async create(data) {
    return await db.collection("tasks").add(data);
  }

  static async getAll({ where = {} }) {
    const tasks = [];
    const snapshot = await db
      .collection("tasks")
      .where("goalId", "==", where.goalId)
      .get();
    snapshot.forEach((doc) => {
      const taskData = doc.data();

      tasks.push({
        id: doc.id,
        ...taskData,
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

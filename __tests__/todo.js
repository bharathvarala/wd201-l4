// eslint-disable-next-line no-unused-vars
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const todoList = require("../todo");

const today = new Date().toLocaleDateString("en-CA");
const prev_day = new Date(
  new Date().setDate(new Date().getDate() - 1)
).toLocaleDateString("en-CA");
const next_day = new Date(
  new Date().setDate(new Date().getDate() + 1)
).toLocaleDateString("en-CA");
a = 10;
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Todo test on item 1",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("Create a new todo", () => {
    const Count = all.length;

    add({
      title: "Test to do 2",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toBe(Count + 1);
  });

  test("Mark a todo as completed", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Retrieving overdue items", () => {
    let overdueList = overdue();
    const len = overdueList.length;
    add({
      title: "Test to do after adding Overdue item",
      completed: false,
      dueDate: prev_day,
    });
    overdueList = overdue();
    expect(overdueList.length).toBe(len + 1);
  });

  test("Retrieving of due today items", () => {
    let duetodayList = dueToday();
    const todaylen = duetodayList.length;
    add({
      title: "Test to do after adding due today item",
      completed: true,
      dueDate: today,
    });
    duetodayList = dueToday();
    expect(duetodayList.length).toBe(todaylen + 1);
  });

  test("Retrieving of due later items", () => {
    let duelaterList = dueLater();
    const tomlen = duelaterList.length;
    add({
      title: "Test to do after addition of dueLater item",
      completed: true,
      dueDate: new Date(
        new Date().setDate(new Date().getDate() + 5)
      ).toLocaleString("en-CA"),
    });
    duelaterList = dueLater();
    expect(duelaterList.length).toBe(tomlen + 1);
  });
});

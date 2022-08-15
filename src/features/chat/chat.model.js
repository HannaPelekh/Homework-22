export default class ChatModel {
  #controller = null;
  #user = [
    {
      id: 1,
      name: "Vasya",
    },
    {
      id: 2,
      name: "Bob",
    },
    {
      id: 3,
      name: "Francesco",
    },
    {
      id: 4,
      name: "Eva",
    },
    {
      id: 5,
      name: "Adam",
    },
  ];
  constructor(controller) {
    this.#controller = controller;
  }

  getUsers() {
    return Promise.resolve(this.#user);
  }
}

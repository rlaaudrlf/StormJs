import { Storm, StormData } from "./Storm";
var model = { name1: 11, name2: 22 };
var data = { name: "root", data: model }
var a = new Storm(data);
setTimeout(() => {
  model.name1 = 11111;
}, 1000);

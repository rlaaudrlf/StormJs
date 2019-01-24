import {Storm, StormData} from "./Storm";
let model = {name1: 11,
name2: 22};
let data = {name: "root",
data: model};
let a = new Storm(data);

setTimeout(() => {
	model.name1 = 11111;
}, 1000);
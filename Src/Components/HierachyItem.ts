import { Dictionary } from "../Core/Utils/Dictionary ";

let dic = new Dictionary<string, Function>();

export function HierachyItem(name: string) {
	return (target: Function): void => {
		dic.Add(name, target);
	};
}

export function GetHierachyItem(): Dictionary<string, Function> {
	return dic;
}

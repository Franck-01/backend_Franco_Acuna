import { parse, format } from "https://deno.land/std@0.147.0/datetime/mod.ts";

console.log(parse("07-07-2022", "dd-MM-yyyy"));
console.log(parse("2022-07-07", "yyyy-MM-dd"));

console.log(format(new Date(2019, 0, 20), "dd-MM-yyyy")); // output : "20-01-2019";
console.log(format(new Date(2019, 0, 20), "yyyy-MM-dd")); // output : "2019-01-20";
console.log(format(new Date(2019, 0, 20), "dd.MM.yyyy")); // output : "2019-01-20";

const getHtml = require("./modules/getHtml");
const findAString = require("./modules/findXString");
const fs = require("fs");

let commonObj = {};
commonObj.container = [];
let url, name;
(async function () {
  try {
    commonObj.siteString = await getHtml("https://fitaudit.ru/food");
    do {
      url = findAString(commonObj, '"vertical_pseudo" href="', '"');
      name = findAString(commonObj, 'title="', '"');
      commonObj.container.push({ name: name, url: url });
    } while (url);

    //insert circle

    for (let i = 0; i < commonObj.container.length - 1; i++) {
      let item, count, unit;
      commonObj.container[i].Content = [];

      commonObj.siteString = await getHtml(commonObj.container[i].url);
      commonObj.siteString = commonObj.siteString.replace(/\s/g, "");
      findAString(commonObj, '<thcolspan="2">БЖУ,содержание</th', ">");

      do {
        count = findAString(commonObj, 'val":"', '"');
        unit = findAString(commonObj, 'unitEn":"', '"');

        item = findAString(commonObj, "https://fitaudit.ru/nutrients/", '"');

        if (item) {
          commonObj.container[i].Content.push({
            Nutrient: item,
            Count: count || 0,
            Unit: unit,
          });
        }
      } while (item);

      commonObj.siteString = await getHtml(
        commonObj.container[i].url + "/amino"
      );
      commonObj.siteString = commonObj.siteString.replace(/\s/g, "s");

      findAString(
        commonObj,
        '<thcolspan="2">Аминокислоты,содержание</th>',
        ">"
      );

      do {
        count = findAString(commonObj, 'val":"', '"');
        unit = findAString(commonObj, 'unitEn":"', '"');

        item = findAString(commonObj, "https://fitaudit.ru/nutrients/", '"');

        if (unit) {
          commonObj.container[i].Content.push({
            Amino_acid: item,
            Count: count || 0,
            Unit: unit,
          });
        }
      } while (item);
      console.log(`${i}/${commonObj.container.length}`);
      commonObj.siteString = undefined;
    }
  } catch (error) {
    console.error(error);
  }
  const fs = require("fs");

  fs.writeFile(
    "modules/output.json",
    JSON.stringify(commonObj.container),
    (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    }
  );
})();

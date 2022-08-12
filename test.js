// import the module
const recipeScraper = require("./scrapers/index.js");

const EXPRESSION = /^([0-9\u00BC-\u00BE\u2150-\u215E  \t]+(?:\([\w\d  ]+\))*)[  \t]+([^\W^\(^\)]+)[  \t]*([^\n,]+)*[  \t,]*([^\n,]+)*/gmu;

const MEASUREMENT_UNITS = [
  ["cup", "cups"],
  ["tablespoon", "tablespoons"],
  ["teaspoon", "teaspoons"],
];

// enter a supported recipe url as a parameter - returns a promise
async function someAsyncFunc() {
  let recipe = await recipeScraper("https://www.allrecipes.com/recipe/23656/german-sweet-chocolate-pie/");

  for (let i = 0; i < recipe.ingredients.length; i++) {
    let ingredient = recipe.ingredients[i].trim();

    EXPRESSION.lastIndex = 0;
    const match = EXPRESSION.exec(ingredient);
    console.log(ingredient, match?.length);
    if (match && match.length >= 5) {
      if (match[3] === undefined) {
        console.log({
          amount: match[1],
          unit: null,
          item: match[2],
          instruction: null,
        });
        continue;
      }

      if (match[4] === undefined) {
        console.log({
          amount: match[1],
          unit: match[2],
          item: match[3],
          instruction: null,
        });
        continue;
      }

      console.log({
        amount: match[1],
        unit: match[2],
        item: match[3],
        instruction: match[4],
      });
    }
  }

  console.log(recipe);
}

someAsyncFunc();

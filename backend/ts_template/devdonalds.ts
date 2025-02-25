import express, { Request, Response } from 'express';

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

interface CookbookData {
  ingredients: ingredient[];
  recipes: recipe[];
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: CookbookData = {
  ingredients: [],
  recipes: [],
};

// Task 1 helper (don't touch)
app.post('/parse', (req: Request, res: Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input);
  if (parsed_string == null) {
    res.status(400).send('this string is cooked');
    return;
  }
  res.json({ msg: parsed_string });
  return;
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that
const parse_handwriting = (recipeName: string): string | null => {
  const newName = recipeName
    .toLowerCase()
    .replace(/[-_]/g, ' ')
    .replace(/[^a-z ]/g, '');

  const retName = newName
    .split(' ')
    .filter((s) => s !== '')
    .map((s) => {
      return s.charAt(0).toUpperCase() + s.slice(1);
    })
    .join(' ');

  return retName.length === 0 ? null : retName;
};

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post('/entry', (req: Request, res: Response) => {
  const entry = req.body;
  try {
    addCookBookEntry(entry);
    return res.status(200).json({});
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

const addCookBookEntry = (entry: ingredient | recipe) => {
  if (!['recipe', 'ingredient'].includes(entry.type)) {
    throw new Error('type can only be "recipe" or "ingredient"');
  }
  if (entry.type === 'ingredient') {
    if (!isValidIngredient(entry as ingredient)) {
      throw new Error('cookTime can only be greater than or equal to 0');
    }
  }
  for (const data of Array.from(Object.values(cookbook))) {
    if (checkUniqueItem(entry, data)) {
      throw new Error('entry names must be unique');
    }
  }

  if (entry.type === 'recipe') {
    const recipe = entry as recipe;
    const uniqueItems = new Set();
    for (const item of recipe.requiredItems) {
      if (uniqueItems.has(item.name)) {
        throw new Error(
          'Recipe requiredItems can only have one element per name'
        );
      } else {
        uniqueItems.add(item.name);
      }
    }
  }

  if (entry.type === 'ingredient') {
    cookbook.ingredients.push(entry as ingredient);
  } else {
    cookbook.recipes.push(entry as recipe);
  }
};

const isValidIngredient = (entry: ingredient) => {
  return entry.cookTime >= 0;
};

const checkUniqueItem = (
  entry: cookbookEntry,
  list: (ingredient | recipe)[]
) => {
  return list.some((item) => item.name === entry.name);
};

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get('/summary', (req: Request, res: Request) => {
  try {
    const ret = getRecipeSummary(req.query.name as string);
    return res.status(200).json({ body: ret });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

const getRecipeSummary = (name: string) => {
  if (isIngredient(name)) {
    throw new Error('The searched name is NOT a recipe name');
  }

  if (!isRecipe(name)) {
    throw new Error('A recipe with the corresponding name cannot be found');
  }

  const recipeItems = cookbook.recipes.find(
    (recipe) => recipe.name === name
  ).requiredItems;

  recipeItems.forEach((item) => {
    if (!isRecipe(item.name) && !isIngredient(item.name)) {
      throw new Error(
        "The recipe contains recipes or ingredients that aren't in the cookbook"
      );
    }
  });

  const ingredientsCount = new Map<string, number>();
  const cookTime = dfsRecipeInfo(name, ingredientsCount);
  const ingredients = Array.from(ingredientsCount.entries()).map(
    ([name, quantity]) => ({ name, quantity })
  );

  return {
    name,
    cookTime,
    ingredients,
  };
};

const isIngredient = (curItemName: string) => {
  return cookbook.ingredients.some(
    (ingredient) => ingredient.name === curItemName
  );
};

const isRecipe = (curItemName: string) => {
  return cookbook.recipes.some((recipe) => recipe.name === curItemName);
};

const dfsRecipeInfo = (
  curItemName: string,
  ingredientsCount: Map<string, number>
): number => {
  if (isIngredient(curItemName)) {
    const ingredient = cookbook.ingredients.find(
      (item) => item.name === curItemName
    );
    ingredientsCount.set(ingredient.name, 1);
    return ingredient.cookTime;
  }

  const recipeItems = cookbook.recipes.find(
    (recipe) => recipe.name === curItemName
  ).requiredItems;

  let totalCookTime = 0;
  for (const item of recipeItems) {
    const curIngredientsCount = new Map<string, number>();
    totalCookTime +=
      dfsRecipeInfo(item.name, curIngredientsCount) * item.quantity;
    multiplyRecipesCount(curIngredientsCount, item.quantity);
    mergeIngredientsCount(ingredientsCount, curIngredientsCount);
  }
  return totalCookTime;
};

const mergeIngredientsCount = (
  count1: Map<string, number>,
  count2: Map<string, number>
) => {
  for (const [key, value] of count2.entries()) {
    count1.set(key, (count1.get(key) || 0) + value);
  }
};

const multiplyRecipesCount = (count: Map<string, number>, quantity: number) => {
  for (const [key, value] of count.entries()) {
    count.set(key, value * quantity);
  }
};

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});

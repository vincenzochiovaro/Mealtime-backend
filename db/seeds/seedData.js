const {
  requestChickenMeals,
  requestPorkMeals,
  requestBeefMeals,
  requestLambMeals,
} = require("../../apiRequests");

const db = require("../connection");

const createChickenMealsTable = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS chickenMeals`);

    await db.query(`
            CREATE TABLE chickenMeals (
              id SERIAL PRIMARY KEY,
              title VARCHAR(255) NOT NULL,
              category VARCHAR(255) NOT NULL,
              instructions TEXT NOT NULL,
              image VARCHAR(255) NOT NULL,
              youtube VARCHAR(255),
              ingredients JSONB NOT NULL
            )
          `);
    console.log("chickenMeals table created successfully.");
  } catch (err) {
    console.log("Error creating chickenMeals table");
  }
};

const createPorkMealsTable = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS porkMeals`);

    await db.query(`
              CREATE TABLE porkMeals (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                category VARCHAR(255) NOT NULL,
                instructions TEXT NOT NULL,
                image VARCHAR(255) NOT NULL,
                youtube VARCHAR(255),
                ingredients JSONB NOT NULL
              )
            `);
    console.log("porkMeals table created successfully.");
  } catch (err) {
    console.log("Error creating porkMeals table");
  }
};

const createBeefMealsTable = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS beefMeals`);

    await db.query(`
                CREATE TABLE beefMeals (
                  id SERIAL PRIMARY KEY,
                  title VARCHAR(255) NOT NULL,
                  category VARCHAR(255) NOT NULL,
                  instructions TEXT NOT NULL,
                  image VARCHAR(255) NOT NULL,
                  youtube VARCHAR(255),
                  ingredients JSONB NOT NULL
                )
              `);
    console.log("beefMeals table created successfully.");
  } catch (err) {
    console.log("Error creating beefMeals table");
  }
};

const createLambMealsTable = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS lambMeals`);

    await db.query(`
                  CREATE TABLE lambMeals (
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    category VARCHAR(255) NOT NULL,
                    instructions TEXT NOT NULL,
                    image VARCHAR(255) NOT NULL,
                    youtube VARCHAR(255),
                    ingredients JSONB NOT NULL
                  )
                `);
    console.log("lambMeals table created successfully.");
  } catch (err) {
    console.log("Error creating lambMeals table");
  }
};

const insertChickenMealsData = async () => {
  try {
    const chickenMealData = await requestChickenMeals();
    for (const meal of chickenMealData) {
      const query = {
        text: `
              INSERT INTO chickenMeals (title, category, instructions, image, youtube, ingredients)
              VALUES ($1, $2, $3, $4, $5, $6::json)
            `,
        values: [
          meal.title,
          meal.category,
          meal.instructions,
          meal.image,
          meal.youtube || null,
          JSON.stringify(meal.ingredients),
        ],
      };

      await db.query(query);
    }
    console.log("inserted data into chicken table successfully");
  } catch (err) {
    console.error("Error inserting chicken meal data:", err);
  }
};

const insertPorkMealsData = async () => {
  try {
    const porkMealData = await requestPorkMeals();
    for (const meal of porkMealData) {
      const query = {
        text: `
                INSERT INTO porkMeals (title, category, instructions, image, youtube, ingredients)
                VALUES ($1, $2, $3, $4, $5, $6::json)
              `,
        values: [
          meal.title,
          meal.category,
          meal.instructions,
          meal.image,
          meal.youtube || null,
          JSON.stringify(meal.ingredients),
        ],
      };

      await db.query(query);
    }
    console.log("inserted data into pork table successfully");
  } catch (err) {
    console.error("Error inserting pork meal data:", err);
  }
};

const insertBeefMealsData = async () => {
  try {
    const beefMealData = await requestBeefMeals();
    for (const meal of beefMealData) {
      const query = {
        text: `
                  INSERT INTO beefMeals (title, category, instructions, image, youtube, ingredients)
                  VALUES ($1, $2, $3, $4, $5, $6::json)
                `,
        values: [
          meal.title,
          meal.category,
          meal.instructions,
          meal.image,
          meal.youtube || null,
          JSON.stringify(meal.ingredients),
        ],
      };

      await db.query(query);
    }
    console.log("inserted data into beef table successfully");
  } catch (err) {
    console.error("Error inserting beef meal data:", err);
  }
};

const insertLambMealsData = async () => {
  try {
    const lambMealData = await requestLambMeals();
    for (const meal of lambMealData) {
      const query = {
        text: `
                    INSERT INTO lambMeals (title, category, instructions, image, youtube, ingredients)
                    VALUES ($1, $2, $3, $4, $5, $6::json)
                  `,
        values: [
          meal.title,
          meal.category,
          meal.instructions,
          meal.image,
          meal.youtube || null,
          JSON.stringify(meal.ingredients),
        ],
      };

      await db.query(query);
    }
    console.log("inserted data into lamb table successfully");
  } catch (err) {
    console.error("Error inserting lamb meal data:", err);
  }
};

const seed = async () => {
  try {
    await createChickenMealsTable();
    await createPorkMealsTable();
    await createBeefMealsTable();
    await createLambMealsTable();
    await insertChickenMealsData();
    await insertPorkMealsData();
    await insertBeefMealsData();
    await insertLambMealsData();
  } catch (err) {
    console.log("Error seeding database:");
  }
};

seed();

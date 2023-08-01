import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Try a more interesting route...",
  });
});

app.get("/eat/apple", (req, res) => {
  res.json({
    message: "Yum yum - you ate an apple!",
  });
});

app.get("/eat/banana", (req, res) => {
  res.json({
    message: "Yum yum - you ate a banana!",
  });
});

app.get("/eat/carrot", (req, res) => {
  res.json({
    message: "Yum yum - you ate a carrot!",
  });
});

app.get<{ exampleRouteParameter: string }>(
  "/echo/:exampleRouteParameter",
  (req, res) => {
    const echoContent = req.params.exampleRouteParameter;
    res.json({
      echo: echoContent,
      message: `I am echoing back to you: ${echoContent}`,
    });
  }
);

app.get<{ numOne: number; numTwo: number }>(
  "/multiply/:numOne/:numTwo",
  (req, res) => {
    /**
     * Note that `numOne` and `numTwo` are both typed as string.
     * (Hover over with your mouse to see!)
     *
     * Route params are, by default, typed as strings when they
     * are parsed by Express.
     */
    const { numOne, numTwo } = req.params;
    const multiplication = numOne * numTwo;
    res.json({
      original: `${numOne} x ${numTwo}`,
      result: multiplication,
    });
  }
);

/**
 * `app.get` can take a type argument.
 *
 *  This could be the name of an existing type (e.g. an interface)
 *    or a literal object type that is provided directly, as below.
 */
app.get<{ name: string }>("/happy-birthday/:name", (req, res) => {
  res.json({
    lyrics: [
      "Happy birthday to you",
      "Happy birthday to you",
      /**
       * The type argument stops us from, e.g., the silly typo
       * of `req.params.namw` - try it, and see!
       */
      `Happy birthday dear ${req.params.name}`,
      "Happy birthday to you!",
    ],
  });
});

app.get<{ str: string }>("/shout/:str", (req, res) => {
  const toShout = `${req.params.str.toUpperCase()}!`;
  res.json({
    shout: toShout,
    result: `I am shouting back to you: ${toShout}`,
  });
});

app.get("/add/:num1/:num2/:num3?", (req, res) => {
  const num1 = parseInt(req.params.num1, 10);
  const num2 = parseInt(req.params.num2, 10);
  const num3 = parseInt(req.params.num3, 10) || 0;
  const add: number = num1 + num2 + num3;
  res.json({
    original: `${num1} + ${num2} + ${num3}`,
    result: add,
  });
});

app.get("/eat/:food", (req, res) => {
  let grammer;
  const vowels = ["a", "e", "i", "o", "u"];
  if (vowels.includes(req.params.food[0])) {
    grammer = "an";
  } else {
    grammer = "a";
  }
  res.json({
    message: `Yum yum - you ate ${grammer} ${req.params.food}!`,
  });
});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});

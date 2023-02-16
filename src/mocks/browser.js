import { setupWorker, rest } from "msw";
const basket = [];
const worker = setupWorker(
  rest.post("/api/basket", async (req, res, ctx) => {
    basket.push(await req.json());

    return res(ctx.status(200));
  }),

  rest.get("/api/basket", (req, res, ctx) => {
    return res(ctx.json(basket));
  }),

  rest.delete("/api/basket", async (req, res, ctx) => {
    const deletedItem = await req.json();
    basket.forEach((item, index) => {
      if (deletedItem.name === item.name) {
        basket.splice(index, 1);
      }
    });
    return res(ctx.json(basket));
  })
);
worker.start();

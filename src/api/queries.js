import { Query, Field } from "@tilework/opus";

export const GET_CATEGORIES = new Query("categories", true).addField("name");

export const GET_CURRENCIES = new Query("currencies", true).addFieldList([
  "symbol",
  "label",
]);

export const GET_CATEGORY_BY_ID = (id) =>
  new Query("category", true)
    .addArgument("input", "CategoryInput", { title: id })
    .addField("name")
    .addField(
      new Field("products", true)
        .addFieldList(["id", "brand", "name", "inStock", "gallery"])
        .addField(
          new Field("prices", true)
            .addField("amount")
            .addField(
              new Field("currency", true).addFieldList(["symbol", "label"])
            )
        )
    );

export const GET_PRODUCT_BY_ID = (id) =>
  new Query("product", true)
    .addArgument("id", "String!", id)
    .addFieldList(["id", "brand", "name", "category", "inStock", "description"])
    .addField(new Field("gallery", true))
    .addField(
      new Field("prices", true)
        .addField("amount")
        .addField(new Field("currency", true).addFieldList(["symbol", "label"]))
    )
    .addField(
      new Field("attributes", true)
        .addFieldList(["id", "name", "type"])
        .addField(
          new Field("items", true).addFieldList(["displayValue", "value", "id"])
        )
    );

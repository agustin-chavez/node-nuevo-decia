import mongoose from "mongoose";
import { productSchema } from "./schema.js"; // Usamos la extensión del archivo en import para que Nodejs reconozca que este es un modulo de EcmaScript

export const productModel = mongoose.model("product", productSchema);

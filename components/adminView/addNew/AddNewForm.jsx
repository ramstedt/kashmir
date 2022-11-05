import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { supabase } from "../../../utils/supabase";

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().positive().integer().required(),
  stock: yup.number().positive().integer().required(),
  category: yup.number().required(),
  image: yup
    .mixed()
    .required("You need to provide an image")
    .test("fileSize", "The file is too large.", (value) => {
      return value && value[0].size <= 2000000;
    })
    .test("type", "Only jpg and png files are supported.", (value) => {
      return (
        (value && value[0].type === "image/png") ||
        value[0].type === "image/jpg" ||
        value[0].type === "image/jpeg"
      );
    }),
});

export default function AddNewForm() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      let { data: categories, error } = await supabase
        .from("category")
        .select("*");
      if (categories) {
        setCategories(categories);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (form) => {
    const imageName = `${Date.now()}_${form.image[0].name}`;
    const imageFile = form.image[0];
    const { data: image, error: imageError } = await supabase.storage
      .from("menuitems")
      .upload(imageName, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });
    if (imageError) return console.log(imageError);
    const publicUrl = supabase.storage
      .from("menuitems")
      .getPublicUrl(imageName);

    console.log(publicUrl.data.publicUrl);

    const { data: menuitem, error: menuitemError } = await supabase
      .from("menuitem")
      .insert([
        {
          name: form.title,
          description: form.description,
          price: form.price,
          stock: form.stock,
          category_id: form.category,
          image: publicUrl.data.publicUrl,
          is_vegetarian: form.vegetarian,
          is_vegan: form.vegan,
          is_gluten_free: form.glutenFree,
          contains_nuts: form.containsNuts,
          is_available: form.available,
        },
      ]);
    if (menuitemError) return console.log(menuitemError);
    reset();
  };

  return (
    <>
      <div className="max-w-lg flex flex-col m-auto">
        <h1>Add new item to menu</h1>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Title:</label>
          <input {...register("title", { required: true })} />
          <p>{errors.title?.message}</p>
          <label htmlFor="description">Description:</label>
          <input type="text" {...register("description", { required: true })} />
          <p>{errors.description?.message}</p>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            {...register("price", { min: 1, required: true })}
          />
          <p>{errors.price?.message}</p>
          <label htmlFor="stock">Stock quantity:</label>
          <input
            type="number"
            {...register("stock", { min: 1, required: true })}
          />
          <p>{errors.stock?.message}</p>
          <label htmlFor="category">Category:</label>
          <select {...register("category", { required: true })}>
            {categories?.map((category, key) => (
              <option key={key} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <div>
            <input type="checkbox" {...register("vegetarian")} />
            <label htmlFor="vegetarian">Is vegetarian</label>
          </div>
          <div>
            <input type="checkbox" {...register("vegan")} />
            <label htmlFor="vegan">Is vegan</label>
          </div>
          <div>
            <input type="checkbox" {...register("glutenFree")} />
            <label htmlFor="glutenFree">Is gluten free</label>
          </div>
          <div>
            <label htmlFor="containsNuts">
              <input type="checkbox" {...register("containsNuts")} />
              Contains nuts
            </label>
          </div>
          <label htmlFor="image">Image:</label>
          <input type="file" {...register("image", { required: true })} />
          <p>{errors.image?.message}</p>
          <label htmlFor="available">
            <input
              type="checkbox"
              accept="image/*"
              {...register("available")}
            />
            Available to order
          </label>
          <button type="submit">Submit</button>
          {isSubmitSuccessful && <p>Item submitted successfully</p>}
        </form>
      </div>
    </>
  );
}

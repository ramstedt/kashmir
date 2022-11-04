export default function AddNewCard() {
  return (
    <>
      <div className="max-w-lg flex flex-col m-auto">
        <form className="flex flex-col" method="POST">
          <label for="title">Title:</label>
          <input type="text" id="title" name="title" required />
          <label for="description">Description:</label>
          <input type="text" id="description" name="description" required />
          <label for="price">Price:</label>
          <input type="text" id="price" name="price" required />
          <label for="description">Stock quantity:</label>
          <input type="text" id="stock" name="stock" required />
          <label for="category">Category:</label>
          <select id="category" name="category" required>
            <option disabled selected value=""></option>
            <option value="starter">Starter</option>
            <option value="mainCourse">Main Course</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
          </select>
          <label for="image">Image:</label>
          <input type="file" id="image" name="image" />
          <label for="vegetarian">Is vegetarian:</label>
          <input type="checkbox" id="vegetarian" name="vegetarian" />
          <label for="vegan">Is vegan:</label>
          <input type="checkbox" id="vegan" name="vegan" />
          <label for="glutenFree">Is gluten free:</label>
          <input type="checkbox" id="glutenFree" name="glutenFree" />
          <label for="containsNuts">Contains nuts:</label>
          <input type="checkbox" id="containsNuts" name="containsNuts" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

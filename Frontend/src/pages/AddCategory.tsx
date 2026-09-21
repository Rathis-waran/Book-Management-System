import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Navbar from "../components/Navbar";
import { deleteCategories, fetchCategories } from "../store/categorySlice";
import { addcategories } from "../api/apis";

const AddCategory = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.categoy);
  const [addCategory, setAddCategory] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const deleteCategory = async (categoryId: number) => {
    try {
      await dispatch(deleteCategories(categoryId));
      dispatch(fetchCategories());
    } catch (error) {
      console.log(error);
    }
  };
  const addNewCategory = async (cat_name: string) => {
    if (!cat_name) {
      return;
    }
    try {
      const category = {
        cat_name: cat_name.trim(),
      };
      await addcategories(category);
      dispatch(fetchCategories());
      setAddCategory("");
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Navbar isAdmin={true} />
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: "70px",
          backgroundColor: "#f5f5f5",
          boxSizing: "border-box",
        }}
      >
        <table
          style={{
            width: "400px",
            borderCollapse: "collapse",
            backgroundColor: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  fontSize: "18px",
                  backgroundColor: "#f0f0f0",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <input
                  type="text"
                  placeholder="Enter category name"
                  value={addCategory}
                  onChange={(e) => setAddCategory(e.target.value)}
                />

                <button
                  onClick={() => {
                    addNewCategory(addCategory);
                  }}
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Add
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td
                  style={{
                    padding: "12px 15px",
                    borderBottom: "1px solid #eee",
                    fontSize: "16px",
                    color: "#333",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {category.cat_name}

                  <button
                    style={{
                      background: "red",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      deleteCategory(category.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AddCategory;

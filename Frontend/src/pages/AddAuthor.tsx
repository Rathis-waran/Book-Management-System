import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Navbar from "../components/Navbar";
import { deleteAuthors, fetchAuthors } from "../store/authorSlice";

const AddAuthor = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector((state) => state.author.author);
  const [addAuthors, setAddAuthor] = useState("");

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const deleteAuthor = async (authorId: number) => {
    try {
      await dispatch(deleteAuthors(authorId)).unwrap();
      dispatch(fetchAuthors());
    } catch (error) {
      return error;
    }
  };

  async function addAuthor(name: string) {
    try {
      addAuthor(name);
      dispatch(fetchAuthors());
      setAddAuthor("");
    } catch (error) {
      return error;
    }
  }

  return (
    <>
      <Navbar isAdmin={true} />

      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: "70px",
          backgroundColor: "#f5f5f5",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            id="author"
            type="text"
            placeholder="Enter author name"
            value={addAuthors}
            onChange={(e) => setAddAuthor(e.target.value)}
            required
          />

          <button
            onClick={() => {
              addAuthor(addAuthors);
            }}
          >
            Add
          </button>
        </div>

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
                Author Names
              </th>

              <th
                style={{
                  padding: "15px",
                  backgroundColor: "#f0f0f0",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {author.map((authors) => (
              <tr key={authors.id}>
                <td
                  style={{
                    padding: "12px 15px",
                    borderBottom: "1px solid #eee",
                    fontSize: "16px",
                    color: "#333",
                  }}
                >
                  {authors.name}
                </td>

                <td
                  style={{
                    padding: "12px 15px",
                    borderBottom: "1px solid #eee",
                  }}
                >
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
                      deleteAuthor(authors.id);
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

export default AddAuthor;

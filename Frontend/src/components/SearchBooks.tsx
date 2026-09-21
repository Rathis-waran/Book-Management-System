import { useState } from "react";

const BookSearch = ({ onSearch }: any) => {
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch(value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "75px",
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        placeholder="Search by book name or author"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          width: "350px",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
    </div>
  );
};

export default BookSearch;

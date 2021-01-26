import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";

export default function Table() {
  const [state, setState] = useState([]);
  /*const data = [
    { name: "John", email: "john@gmail.com", age: 12, gender: "Male" },
    { name: "Bren", email: "bren@gmail.com", age: 24, gender: "Male" },
    { name: "Marry", email: "marry@gmail.com", age: 18, gender: "Female" },
    { name: "Shohail", email: "shohail@gmail.com", age: 25, gender: "Male" },
    { name: "Aseka", email: "aseka@gmail.com", age: 19, gender: "Female" },
    { name: "Meuko", email: "meuko@gmail.com", age: 12, gender: "Female" }
  ];*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        console.log(res);

        setState(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [state]);

  const columns = [
    {
      title: "Name",
      field: "name"
    },
    {
      title: "Email",
      field: "email"
    },
    {
      title: "Website",
      field: "website"
    },
    {
      title: "Phone",
      field: "phone"
    },
    {
      title: "Company",
      field: "company",
      render: (row) => <span>{row.company.name}</span>
    }
  ];

  return (
    <MaterialTable
      title="Employee Details"
      data={state}
      columns={columns}
      options={{
        search: true,
        pageSizeOptions: [5, 10, 20],
        filtering: true,
        exportButton: true,
        selection: true,
        selectionProps: (rowData) => ({
          disabled: rowData.name === "Aseka",
          color: "primary"
        })
      }}
      actions={[
        {
          tooltip: "Save",
          icon: "save",
          onClick: (evt, data) => console.log(data[0].name)
        }
      ]}
    />
  );
}

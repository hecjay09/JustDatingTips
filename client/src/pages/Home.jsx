import { useState, useEffect } from "react";
import CreateDate from "../components/CreateDate"
import api from "../api";

export default function Home() {
  const [dates, setDates] = useState([]);


  useEffect(() => {
    getDates();
  }, []);

  const getDates = () => {
    api
      .get("/api/dates/")
      .then((res) => res.data)
      .then((data) => {
        setDates(data);
        console.log(data);
      })
      .catch((err) => alert(err + " -- dates"));
  };

  const deleteDate = (id) => {
    api.delete(`/api/dates/delete/${id}/`).then((res) => {
      res.status === 204
        ? alert("Date Successfully Deleted")
        : alert("Failed To Delete Date");
    });
    getDates();
    getDates();
  };


  return <div>
    <div>
      <h2>Dates</h2>
      <ul>
      {dates.map((date) => (
        <li key={date.id}>
          <p>{date.fname}</p>
          <p>{date.age}</p>
          <p>{date.gender}</p>
          <p>{date.tip}</p>
          <p>{date.dateIdeas}</p>
          <button onClick={() => deleteDate(date.id)}>Delete</button>
        </li>
      ))}</ul>
    </div>
  </div>;
}

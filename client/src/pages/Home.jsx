import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import api from "../api";

export default function Home() {
  const [dates, setDates] = useState([]);
  const genAi = new GoogleGenerativeAI(
    "AIzaSyA9xzrUsNQuPzwW45z1-o6jynicjwfEZE0"
  );
  const model = genAi.getGenerativeModel({ model: "gemini-pro" });
  useEffect(() => {
    getDates();
  }, []);

  const generate = async (e, date, isTip) => {
    e.preventDefault();
    let ordinal = "";
    if (date.dateCount === 1) {
      ordinal = "st";
    } else if (date.dateCount === 2) {
      ordinal = "nd";
    } else if (date.dateCount === 3) {
      ordinal = "rd";
    } else {
      ordinal = "th";
    }

    if (isTip) {
      const prompt =
        "generate 10 tips on the " +
        date.dateCount +
        ordinal +
        " date with " +
        date.gender +
        ", " +
        date.age +
        " years old";
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const tip = response.text();
      const res = api
        .put(`/api/dates/edit/${date.id}/`, {
          fname: date.fname,
          age: date.age,
          gender: date.gender,
          dateCount: date.dateCount,
          tip: tip,
          dateIdeas: date.dateIdeas,
        })
        .then((res) => console.log(res.data))
        .catch((err) => {
          console.error(err);
        });
    } else {
      const prompt =
        "generate 10 cheap dating ideas on the " +
        date.dateCount +
        ordinal +
        " date with " +
        date.gender +
        ", " +
        date.age +
        " years old";
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const ideas = response.text();
      const res = api
        .put(`/api/dates/edit/${date.id}/`, {
          fname: date.fname,
          age: date.age,
          gender: date.gender,
          dateCount: date.dateCount,
          tip: date.tip,
          dateIdeas: ideas,
        })
        .then((res) => console.log(res.data))
        .catch((err) => {
          console.error(err);
        });
    }
    getDates();
    getDates();
  };

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

  return (
    <div>
      <div>
        <h2>Dates</h2>
        <ul>
          {dates.map((date) => (
            <li key={date.id}>
              <p>{date.fname}</p>
              <p>{date.age}</p>
              <p>{date.gender}</p>
              <p>{date.dateCount}</p>
              <div>
                <p>{date.tip}</p>{" "}
                <button onClick={(e) => generate(e, date, true)}>
                  Generate Date Tips
                </button>
              </div>
              <div>
                <p>{date.dateIdeas}</p>{" "}
                <button onClick={(e) => generate(e, date, false)}>
                  Generate Date Ideas
                </button>
              </div>
              <br />
              <button onClick={() => deleteDate(date.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

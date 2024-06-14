import api from "../api";
import { useState } from "react";

export default function CreateDate() {
  const [fname, setFname] = useState("");
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState("");
  const [dateCount, setDateCount] = useState(1);
  const [tip, setTip] = useState("Click Generate Button");
  const [ideas, setIdeas] = useState("Click Generate Button");
  const [dates, setDates] = useState([]);

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

  const createDate = async (e) => {
    e.preventDefault();
    api
      .post("/api/dates/", {
        fname: fname,
        age: age,
        gender: gender,
        dateCount: dateCount,
        tip: tip,
        dateIdeas: ideas,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 204 || res.status === 201) {
          alert("Date Created");
        } else {
          alert("Failed to Create a Date");
        }
        getDates();
      })
      .catch((e) => console.error(e));

  };
  return (
    <div>
      <form onSubmit={createDate}>
        <label htmlFor="FirstName">First Name: </label>
        <br />
        <input
          type="text"
          name="fname"
          id="fname"
          required
          onChange={(e) => setFname(e.target.value)}
          value={fname}
        ></input>
        <br />

        <label htmlFor="Age">Age: </label>
        <br />
        <input
          type="number"
          name="age"
          id="age"
          min="18"
          required
          onChange={(e) => setAge(e.target.value)}
          value={age}
        ></input>
        <br />

        <label htmlFor="Gender">Gender: </label>
        <br />
        <input
          type="radio"
          name="maleCreateD"
          id="maleCreateD"
          value="male"
          checked={gender === "male"}
          onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor="maleCreateD">Male</label>
        <input
          type="radio"
          name="femaleCreateD"
          id="femaleCreateD"
          value="female"
          checked={gender === "female"}
          onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor="femaleCreateD">Female</label>
        <input
          type="radio"
          name="otherCreateD"
          id="otherCreateD"
          value="other"
          checked={gender === "other"}
          onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor="otherCreateD">Other</label>
      </form>

      <label htmlFor="DateCount">Date number: </label>
      <br />
      <input
        type="number"
        name="dateCount"
        id="age"
        min="1"
        required
        onChange={(e) => setDateCount(e.target.value)}
        value={dateCount}
      ></input>
      <br />
      <button onClick={createDate}>Submit</button>
    </div>
  );
}

import { click } from "@testing-library/user-event/dist/click";
import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const Cards = (props) => {
    return (
      <div
        key={props.id}
        className={props.id === selectedCard ? "card2" : "card"}
      >
        <img alt="" className="image" src={props.imgSrc} />
        <h1>{props.name}</h1>
        <h2>{props.age}</h2>
        <h2>{props.origin}</h2>
        <button onClick={() => props.onClick(props.name, props.id)}>
          Show name
        </button>
      </div>
    );
  };

  const CardsSkill = (props) => {
    return (
      <div key={props.id} className="card">
        <img alt="" className="image" src={props.imgSrc} />
        <h1>{props.name}</h1>
      </div>
    );
  };

  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [selectedCard, setSelectedCard] = useState();
  const [skillHero, setSkillHero] = useState([]);
  const [selectedHero, setSelectedHero] = useState(false);

  console.log("render");

  const getHero = async () => {
    const res = await fetch("https://materi-thrive-demo.vercel.app/api/hero");
    const hero = await res.json();
    console.log(hero);
    setData(hero);
  };

  const getSkill = async () => {
    const res = await fetch(
      `https://materi-thrive-demo.vercel.app/api/hero/${selectedCard}`
    );
    const skill = await res.json();
    console.log("skill hero", skill.skills);
    setSelectedHero(true);
    setSkillHero(skill.skills);
  };

  useEffect(() => {
    getHero();
  }, []);

  const handleClick = (name, id) => {
    setName(name);
    console.log(click);
    setSelectedCard(id);
  };

  function backButton() {
    window.location.reload(false);
  }

  return (
    <div className="container">
      {selectedHero
        ? skillHero.map((skill) => (
            <CardsSkill
              key={skill.id}
              imgSrc={skill.imgSrc}
              name={skill.name}
            />
          ))
        : data.map((hero) => (
            <Cards
              name={hero.name}
              age={hero.age}
              origin={hero.origin}
              imgSrc={hero.imgSrc}
              id={hero.id}
              key={hero.id}
              onClick={handleClick}
            />
          ))}
      <h1>{name}</h1>
      {!selectedHero ? (
        <button onClick={() => getSkill(selectedCard)}>
          See {name} element
        </button>
      ) : (
        <button onClick={backButton}>Back</button>
      )}
    </div>
  );
}

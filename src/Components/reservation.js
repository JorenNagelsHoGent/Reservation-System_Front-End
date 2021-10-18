import "./css/reservation.css";
import React from "react";
import sponsors from "../img/sponsors.png";
import { withRouter } from "react-router";

// require("dotenv").config();

function Reservation(props) {
  return (
    <div className="Reservation">
      <PlacesLeft />
      <Form history={props.history} />
    </div>
  );
}
function SponsorsCard(props) {
  return (
    <div className="Card SponsorsCard">
     <img alt="Sponsor Img" src={sponsors} />
    </div>
  );
}
function Description(props) {
  return (
    <div className="Card Description">
      VC Oudegem hecht veel waarde aan de bescherming van persoonsgegevens en
      verwerkt de gegevens conform de actuele wetgeving (GDPR)
    </div>
  );
}

class PlacesLeft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      vrijdag: {
        shift_1: 0,
        shift_2: 0,
      },
      zaterdag: {
        shift_1: 0,
        shift_2: 0,
      },
      zondag: {
        shift_1: 0,
        shift_2: 0,
      },
    };
  }
  async getOrdersByDay(day, shift) {
    let result = await fetch(
      `${window.location.origin}/api/reservation/orders?day=${day}&shift=${shift}`
    );
    result = await result.json();

    return result.totalPlacesLeft;
  }

  async componentDidMount() {
    try {
      this.state.vrijdag.shift_1 = await this.getOrdersByDay(
        "Vrijdag",
        "18u30"
      );
      this.state.vrijdag.shift_2 = await this.getOrdersByDay(
        "Vrijdag",
        "20u30"
      );

      this.state.zaterdag.shift_1 = await this.getOrdersByDay(
        "Zaterdag",
        "17u00"
      );
      this.state.zaterdag.shift_2 = await this.getOrdersByDay(
        "Zaterdag",
        "19u30"
      );

      this.state.zondag.shift_1 = await this.getOrdersByDay("Zondag", "11u30");
      this.state.zondag.shift_2 = await this.getOrdersByDay("Zondag", "13u30");

      this.setState({ isLoading: false });
    } catch (err) {
      console.log("Er is iets fout gelopen. Probeer het later opnieuw.");
    }
  }

  render() {
    return (
      <div className="PlacesLeft">
        {this.state.isLoading ? (
          <div>LOADING</div>
        ) : (
          <div>
            <PlacesCard
              day="Vrijdag"
              shift_1="18u30"
              shift_2="20u30"
              placesLeft={this.state.vrijdag}
            />
            <PlacesCard
              id="middleCard"
              day="Zaterdag"
              shift_1="17u00"
              shift_2="19u30"
              placesLeft={this.state.zaterdag}
            />
            <PlacesCard
              day="Zondag"
              shift_1="11u30"
              shift_2="13u30"
              placesLeft={this.state.zondag}
            />
          </div>
        )}
      </div>
    );
  }
}
function PlacesCard(props) {
  return (
    <div className="PlacesCard" id={props.id}>
      <h1>{props.day}</h1>
      <div className="shift_1">
        <h2>Shift om {props.shift_1}</h2>
        <div className="placesNumber">{props.placesLeft.shift_1}</div>
      </div>
      <div className="shift_2">
        <h2>Shift om {props.shift_2}</h2>
        <div className="placesNumber">{props.placesLeft.shift_2}</div>
      </div>
    </div>
  );
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      clickedSubmit: false,
      naam: "",
      email: "",
      tel: "",
      mosselen_volwassen: 0,
      stoofvlees_volwassen: 0,
      mosselen_kinderen: 0,
      stoofvlees_kinderen: 0,
      dag_shift: "",
    };
  }

  onFormSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    };
    fetch(`${window.location.origin}/api/reservation`, requestOptions)
      // .then((response) => response.text())
      .then((response) => {
        if (response.ok) {
          this.props.history.push("/succes");
        } else {
          response.json().then((json) => {
            alert(json.errorMsg);
          });
        }
      });
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {}

  render() {
    return (
      <form className="Form" onSubmit={this.onFormSubmit}>
        <Card
          onChange={this.handleInputChange}
          name="naam"
          title="Naam"
          type="text"
          placeholder="Jouw Naam"
          required={true}
        ></Card>
        <Card
          onChange={this.handleInputChange}
          name="email"
          title="E-mail"
          type="email"
          placeholder="Jouw E-mailadres"
          required={true}
        ></Card>
        <Card
          onChange={this.handleInputChange}
          name="tel"
          title="Telefoon Nummer"
          type="tel"
          placeholder="Jouw Telefoon Nummer"
          required={false}
        ></Card>
        <Card
          onChange={this.handleInputChange}
          name="mosselen_volwassen"
          title="Mosselen Volwassen Porties €24"
          type="selectAmount"
          amount={15}
          required={true}
        ></Card>
        <Card
          onChange={this.handleInputChange}
          name="stoofvlees_volwassen"
          title="Stoofvlees volwassen Porties €14"
          type="selectAmount"
          amount={15}
          required={true}
        ></Card>
        <Card
          onChange={this.handleInputChange}
          name="mosselen_kinderen"
          title="Mosselen kinder Porties €15"
          type="selectAmount"
          amount={15}
          required={true}
        ></Card>
        <Card
          onChange={this.handleInputChange}
          name="stoofvlees_kinderen"
          title="Stoofvlees kinder Porties €12"
          type="selectAmount"
          amount={15}
          required={true}
        ></Card>
        <Card
          onChange={this.handleInputChange}
          name="dag_shift"
          title="Dag en Shift"
          type="selectOption"
          options={[
            "Vrijdag 24 September - 18u30",
            "Vrijdag 24 September - 20u30",
            "Zaterdag 25 September - 17u00",
            "Zaterdag 25 September - 19u30",
            "Zondag 26 September - 11u30",
            "Zondag 26 September - 13u30",
          ]}
          required={true}
        ></Card>
        <Description />
        <SubmitButton value="Verzenden" />
        <SponsorsCard />
      </form>
    );
  }
}

function Card(props) {
  let requiredStar = "";

  if (props.required) {
    requiredStar = <div className="requiredStar">*</div>;
  }
  return (
    <div className="Card">
      <h1>
        {props.title}
        {requiredStar}
      </h1>
      <Input
        onChange={props.onChange}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        amount={props.amount}
        options={props.options}
        required={props.required}
      />
    </div>
  );
}
function Input(props) {
  let input;
  switch (props.type) {
    case "text":
    case "email":
    case "tel":
      input = (
        <TextInput
          onChange={props.onChange}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          required={props.required}
        />
      );
      break;
    case "selectAmount":
      input = (
        <SelectNumber
          onChange={props.onChange}
          name={props.name}
          amount={props.amount}
        />
      );
      break;
    case "selectOption":
      input = (
        <SelectOption
          onChange={props.onChange}
          name={props.name}
          options={props.options}
        />
      );
      break;
    default:
      break;
  }

  return <div>{input}</div>;
}

function TextInput(props) {
  let inputJSX = (
    <input
      onChange={props.onChange}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
  if (props.required) {
    inputJSX = (
      <input
        onChange={props.onChange}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        required
      />
    );
  }
  return (
    <div className="outer-input">
      {inputJSX}
      <div className="border"></div>
    </div>
  );
}
function SelectNumber(props) {
  const amount = props.amount;
  let options = [];

  for (let i = 0; i < amount + 1; i++) {
    options[i] = (
      <option key={i} value={i.toString()}>
        {i}
      </option>
    );
  }

  return (
    <select
      onChange={props.onChange}
      name={props.name}
      className="SelectNumber"
      required
      defaultValue=""
    >
      {/* <option value="" disabled>
        Kies Aantal
      </option> */}
      {options}
    </select>
  );
}

function SelectOption(props) {
  let options = props.options;
  let optionsJSX = [];

  options.forEach((option) => {
    optionsJSX.push(
      <option key={option} value={option}>
        {option}
      </option>
    );
  });

  return (
    <select
      onChange={props.onChange}
      name={props.name}
      className="SelectOption"
      required
      defaultValue=""
    >
      <option value="" disabled>
        Kies Optie
      </option>
      {optionsJSX}
    </select>
  );
}

function SubmitButton(props) {
  return (
    <div className="submitButton">
      <input type="submit" value={props.value} />
    </div>
  );
}

export default withRouter(Reservation);

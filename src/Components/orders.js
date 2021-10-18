import "./css/orders.css";
import React from "react";
// import { withRouter } from "react-router";

class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderTableData = this.renderTableData.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state = {
      isLoading: true,
      reservations: {},
      filter: {
        name: "",
        tel: "",
        email: "",
        day: "",
        shift: "",
        confirmed: "",
      },
    };
  }

  async getReservations() {
    let result = await fetch(
      `${window.location.origin}/api/reservation`
    );
    result = await result.json();

    return result;
  }

  async componentDidMount() {
    try {
      this.state.reservations = await this.getReservations();

      this.setState({
        isLoading: false,
      });
    } catch (err) {
      console.log("Er is iets fout gelopen. Probeer het later opnieuw.");
    }
  }
  handleInputChange(event) {
    const column = event.target.name;

    const value = event.target.value;
    this.setState({
      filter: { ...this.state.filter, [column]: value.toLocaleLowerCase() },
    });
  }
  handleReset() {
    this.setState({
      filter: { name: "", email: "", day: "", shift: "", confirmed: "" },
    });
  }

  renderTableData() {
    let mapped = [];
    let filter = this.state.filter;
    let total = {
      mosselen_volwassen: 0,
      stoofvlees_volwassen: 0,
      mosselen_kinderen: 0,
      stoofvlees_kinderen: 0,
    };
    this.state.reservations.forEach((reservation, index) => {
      if (
        reservation.naam.toLowerCase().includes(filter.name) &&
        reservation.email.toLowerCase().includes(filter.email) &&
        reservation.dag.toLowerCase().includes(filter.day) &&
        reservation.shift.toLowerCase().includes(filter.shift) &&
        !(
          (reservation.bevestigd && filter.confirmed === "notconfirmed") ||
          (!reservation.bevestigd && filter.confirmed === "confirmed")
        )
      ) {
        total.mosselen_volwassen += reservation.mosselen_volwassen;
        total.stoofvlees_volwassen += reservation.stoofvlees_volwassen;
        total.mosselen_kinderen += reservation.mosselen_kinderen;
        total.stoofvlees_kinderen += reservation.stoofvlees_kinderen;

        mapped.push(
          <tr key={reservation._id}>
            <td id="nr">{index + 1}</td>
            <td id="name">{reservation.naam}</td>
            <td id="email">{reservation.email}</td>
            <td id="tel">{reservation.tel}</td>
            <td id="day">{reservation.dag}</td>
            <td id="shift">{reservation.shift}</td>
            <td className="order">{reservation.mosselen_volwassen}</td>
            <td className="order">{reservation.stoofvlees_volwassen}</td>
            <td className="order">{reservation.mosselen_kinderen}</td>
            <td className="order">{reservation.stoofvlees_kinderen}</td>
            <td id="date">
              {new Date(reservation.datum_reservatie).toLocaleDateString()}
            </td>
            <td id="confirmed">
              {reservation.bevestigd ? (
                <i className="fas fa-check"></i>
              ) : (
                <i className="fas fa-times"></i>
              )}
            </td>
          </tr>
        );
      }
    });
    mapped.push(
      <tr id="total" key="total">
        <td colSpan="6" id="Total">
          Totaal
        </td>
        <td className="orderTotal">{total.mosselen_volwassen}</td>
        <td className="orderTotal">{total.stoofvlees_volwassen}</td>
        <td className="orderTotal">{total.mosselen_kinderen}</td>
        <td className="orderTotal">{total.stoofvlees_kinderen}</td>
        <td colSpan="2" id="totalNR">
          {total.mosselen_volwassen +
            total.stoofvlees_volwassen +
            total.mosselen_kinderen +
            total.stoofvlees_kinderen}
        </td>
      </tr>
    );
    return mapped;
  }
  render() {
    let JSX = <div className="Orders">LOADING</div>;
    if (!this.state.isLoading) {
      JSX = (
        <div className="Orders">
          <div className="filters">
            <form>
              <input
                name="name"
                onChange={this.handleInputChange}
                placeholder="Naam"
              ></input>
              <input
                name="email"
                onChange={this.handleInputChange}
                placeholder="E-Mail"
              ></input>
              {/* <select name="day" onChange={this.handleInputChange}>
                <option value="">Alles</option>
                <option value="Vrijdag">Vrijdag</option>
                <option value="Zaterdag">Zaterdag</option>
                <option value="Zondag">Zondag</option>
              </select> */}
              <select name="shift" onChange={this.handleInputChange}>
                <option value="">Alles</option>
                <option value="18u30">Vrijdag 18u30</option>
                <option value="20u30">Vrijdag 20u30</option>
                <option value="17u00">Zaterdag 17u00</option>
                <option value="19u30">Zaterdag 19u30</option>
                <option value="11u30">Zondag 11u30</option>
                <option value="13u30">Zondag 13u30</option>
              </select>
              <select name="confirmed" onChange={this.handleInputChange}>
                <option value="">Alles</option>
                <option value="confirmed">Bevestigd</option>
                <option value="notconfirmed">Niet Bevestigd</option>
              </select>
              <input
                type="reset"
                value="reset"
                onClick={this.handleReset}
              ></input>
            </form>
          </div>
          <table>
            <thead>
              <tr>
                <th id="nr">Nr</th>
                <th id="name">Naam</th>
                <th id="email">E-Mail</th>
                <th id="tel">Telefoon Nr</th>
                <th id="day">Dag</th>
                <th id="shift">Shift</th>
                <th className="order">Volwassen Mosselen</th>
                <th className="order">Volwassen Stoofvlees</th>
                <th className="order">Kinder Mosselen</th>
                <th className="order">Kinder Stoofvlees</th>
                <th id="date">Datum</th>
                <th id="confirmed">Bevestigd</th>
              </tr>
            </thead>
            <tbody>{this.renderTableData()}</tbody>
          </table>
        </div>
      );
    }

    return JSX;
  }
}

export default Orders;

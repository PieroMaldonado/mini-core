import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function App() {

  const [clients, setClients] = useState([])
  const [allClients, setAllClients] = useState([])

  const [contracts, setContracts] = useState([])
  const [allContracts, setAllContracts] = useState([])

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [totalAmount, setTotalAmount] = useState(0);


  useEffect(() => {
    axios
    .get("http://localhost:4000/clientes/all")
    .then((response) => {
      setClients([])
      setAllClients(response.data)
    })
  },[]);

  useEffect(() => {
    axios
    .get("http://localhost:4000/contratos/all")
    .then((response) => {
      setContracts([])
      setAllContracts(response.data)
    })
  },[]);

  function findClientName(clientID) {
    let client = allClients.find(client => client.id === clientID);
    return client.name;
  }

  const handleSelect = (date) => {
    let contractsCopy = JSON.parse(JSON.stringify(allContracts));

    let filtered = contractsCopy.filter((contract) => {
        let contractDate = new Date(contract["date"]);
        contractDate.setHours(0, 0, 0, 0);
        return (
            contractDate >= date.selection.startDate &&
            contractDate <= date.selection.endDate
        );
    });

    let sumAmounts = filtered.reduce((acc, contract) => {
        if (acc[contract.id_cliente]) {
            acc[contract.id_cliente] += contract.amount;
        } else {
            acc[contract.id_cliente] = contract.amount;
        }
        return acc;
    }, {});

    let seen = {};
    let uniqueContracts = filtered.filter(contract => {
        if (!seen[contract.id_cliente]) {
            seen[contract.id_cliente] = true;
            contract.amount = sumAmounts[contract.id_cliente];
            return true;
        }
        return false;
    });

    let totalAmount = uniqueContracts.reduce((acc, contract) => acc + contract.amount, 0);
    
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setContracts(uniqueContracts);
    document.getElementById("totalAmount").innerHTML = "Total: " + totalAmount;
    console.log(totalAmount);
};

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }

  return (
    <div className="App">
      <header className="App-header">
        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
        <div style={{ display: "flex" }}>
          <div style={{ flexDirection: "column" }}>
            <h2 style={{fontSize: "20px"}}>CLIENTES</h2>
            <table className="table1" style={{ marginRight: "150px" }}>
              <thead>
                <tr>
                  <th>id</th>
                  <th>nombre</th>
                </tr>
              </thead>
              <tbody>
                {allClients.map((client) => (
                  <tr key={client.id} style={{ height: "1px" }}>
                    <td class="table-column">{client["id"]}</td>
                    <td class="table-column">{client["name"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ flexDirection: "column" }}>
            <h2 style={{fontSize: "20px"}}>CONTRATOS</h2>
            <table className="table2">
              <thead>
                <tr>
                  <th>id</th>
                  <th>cliente</th>
                  <th>nombre</th>
                  <th>monto</th>
                  <th>fecha</th>
                </tr>
              </thead>
              <tbody>
                {allContracts.map((contract) => {
                  let date = new Date(contract["date"]);
                  return (
                    <tr key={contract.id} style={{ height: "1px" }}>
                      <td>{contract["id"]}</td>
                      <td class="table-column">{findClientName(contract["id_cliente"])}</td>
                      <td class="table-column">{contract["name"]}</td>
                      <td class="table-column">{contract["amount"]}</td>
                      <td class="table-column">{date.toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ flexDirection: "column" }}>
          <h2 style={{fontSize: "35px"}}>Fecha: {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</h2>
          <table className="table3">
            <thead>
              <tr>
                <th>cliente</th>
                <th>monto_total</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.id} style={{ height: "1px" }}>
                  <td class="table-column">{findClientName(contract["id_cliente"])}</td>
                  <td class="table-column">{contract["amount"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div id="totalAmount">Total: {totalAmount}</div>
        </div>
      </header>
    </div>
  );
}

export default App;

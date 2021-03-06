import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import Web3 from 'web3'
import { LIBRARY_ABI, LIBRARY_ADDRESS } from '../config';
import { Table, Button } from 'react-bootstrap';


class TitlesTable extends Component {

  constructor(props) {

    super(props);
    this.state = {
      titles: ['1', '2', '3', '4']
    };

  }

  componentDidMount() {
    this.loadTitles()
    //this.timerID = setInterval(()=> this.loadTitles(),3000)
  }

  borrowHandler = (event) => {
    //alert(event.target.getAttribute("data-booktitle"));
    let booktitle = event.target.getAttribute("data-booktitle");
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    const library = new web3.eth.Contract(LIBRARY_ABI, LIBRARY_ADDRESS);
    //const borrowbook = library.methods.borrow(booktitle).call();
    let walletaccount = document.getElementById('connectedwallet').value
    library.methods.borrow(booktitle).call();
  }

  async loadTitles() {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    const library = new web3.eth.Contract(LIBRARY_ABI, LIBRARY_ADDRESS);
    //const catalogue = await library.methods.returnCatalogueLength.call()
    //const catalogue = library.methods.returnCatalogue.call()
    //const titles =  await library.methods.catalogue.call();
    //const titles =  await library.methods.titles.call();
    //const numtitles =  await library.methods.numtitles.call();
    const numtitles = library.methods.numtitles.call();

    //console.log(Object.values(catalogue))
    //alert(numtitles)
    let books = [];
    for (var i = 1; i <= 2; i++) {
      const thistitle = await library.methods.titles('book2').call()

      books.push({ title: thistitle.title, numloanedout: thistitle.numloanedout, total: thistitle.total })

      this.setState({
        titles: books
      })

    }

  }
  //{this.state.books.map(title => <li>{title}</li>)}
  render() {
    return (
      <div>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Copies</th>
              <th>Loaned out</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.titles.map(thistitle =>
              <tr>
                <td>{thistitle}</td>
                <td>{thistitle.titles}</td>
                <td>{thistitle.total}</td>
                <td>{thistitle.numloanedout}</td>
                <td>
                  <Button variant="outline-success" size="sm">Borrow</Button>
                  <Button variant="outline-danger" size="sm" className="ml-3">Return</Button></td>
              </tr>

            )}
          </tbody>
        </Table>
      </div>
    );
  }

}

export default TitlesTable;

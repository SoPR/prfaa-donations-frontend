import React, { Component } from 'react';
import {
	Row,
	Col,
	Modal,
	FormGroup,
	FormControl,
	InputGroup,
	Button
} from 'react-bootstrap';
import ReactTable from 'react-table';
import queryString from 'query-string';

import client from '../../Feathers';
import searchActions from '../actions/searchActions';
import './search.css';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchTerm: '',
      modalInfo: null,
			showModal: false,
			userHasTyped: false
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.id;

    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    const { location } = this.props;
    const { search } = location;
    if (search && queryString.parse(search).q) {
      this.setState({ searchTerm: queryString.parse(search).q, userHasTyped: true }, () => {
        this.search();
      });
    }

    this.searchInput.focus();
  }

  search = () => {
    const donationOffer = client.service('donation-offer');
    this.setState({
			results: [],
			userHasTyped: true
    });
    if (this.state.searchTerm.length) {
      return donationOffer
        .find({ query: { $search: this.state.searchTerm } })
        .then(resultResponse =>
          this.setState({ results: resultResponse.data })
        )
        .catch(alert);
    } else {
      return this.setState({ results: [] });
    }
  };

  claim = id => {
    const data = {
      acceptedBy: 'Placeholder Name',
      id
    };
    searchActions.acceptDonation(data);
  };

  handleRowClick = rowInfo => {
    return (e, handleOriginal) => {
      console.log('It was in this row:', rowInfo);

      this.setState({
        modalInfo: rowInfo.original,
        showModal: true
      });

      if (handleOriginal) {
        handleOriginal();
      }
    };
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      modalInfo: null
    });
  };

  render() {
		const { userHasTyped, showModal, modalInfo, results, searchTerm } = this.state;
		
		let content = null;
		
    if (userHasTyped) {
      content = (
        <ReactTable
          data={results}
          columns={[
            {
              Header: 'Full Name',
              accessor: 'fullname'
            },
            {
              Header: 'Organization',
              accessor: 'organizationName'
            },
            {
              Header: 'Phone Number',
              accessor: 'phoneNumber'
            },
            {
              Header: 'Email',
              accessor: 'email'
            },
            {
              Header: 'Category',
              accessor: 'donationCategory'
            },
            {
              Header: 'Location',
              accessor: 'locationOfDonation'
            },
            {
              Header: 'Confirmed',
              accessor: 'isConfirmed'
            },
            {
              Header: 'Verified',
              accessor: 'isVerified'
            },
            {
              Header: 'Accepted',
              accessor: 'isAccepted'
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          getTdProps={(state, rowInfo) => ({
            onClick: this.handleRowClick(rowInfo)
          })}
        />
      );
    }

    return (
      <div>
        <h1 className="text-center">Find Donation Offers</h1>
        <br />
        <Row>
          <Col sm={4} smOffset={4}>
            <FormGroup>
              <InputGroup>
                <FormControl
                  type="text"
                  inputRef={input => this.searchInput = input}
                  id="searchTerm"
                  placeholder="Search Donations..."
                  value={searchTerm}
                  onChange={this.handleInputChange}
									onKeyPress={(e) => {
										if (e.key === 'Enter') {
											this.search();
										}
									}}
                />
                <InputGroup.Button>
                  <Button onClick={this.search}>Search</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <div className="results" style={{ marginBottom: 80 }}>{content}</div>
        <Modal show={showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>More Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {JSON.stringify(modalInfo, null, 2)}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
